// GA4 Data API → JSON for the matthewrenfer.com live dashboard.
//
// Runs as an AWS Lambda behind a Function URL. The service-account key lives only
// here (env var, base64), so it never reaches the browser. Queries the GA4 Data
// API over REST with google-auth-library (no heavy gRPC client → small bundle),
// caches the result in the warm container, and returns clean JSON the static
// dashboard fetches.
//
// Env vars:
//   GA4_PROPERTY_ID          numeric property id (e.g. 548524418)
//   GA_SERVICE_ACCOUNT_KEY   base64 of the service-account JSON key
//   ALLOWED_ORIGIN           (optional) CORS origin, defaults to the live site

import { GoogleAuth } from 'google-auth-library';

const PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? '';
const ALLOWED_ORIGIN =
    process.env.ALLOWED_ORIGIN ?? 'https://matthewrenfer.com';
const CACHE_TTL_MS = 120_000; // 2 min — fast dashboard, easy on the GA4 quota
const LOOKBACK = '28daysAgo';

const auth = new GoogleAuth({
    credentials: JSON.parse(
        Buffer.from(
            process.env.GA_SERVICE_ACCOUNT_KEY ?? '',
            'base64',
        ).toString('utf8'),
    ),
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

async function ga(
    method: 'runReport' | 'runRealtimeReport',
    body: object,
): Promise<GaResponse> {
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();
    const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:${method}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    );
    if (!res.ok) {
        throw new Error(`GA ${method} ${res.status}: ${await res.text()}`);
    }
    return (await res.json()) as GaResponse;
}

interface GaRow {
    dimensionValues?: { value: string }[];
    metricValues?: { value: string }[];
}
interface GaResponse {
    rows?: GaRow[];
}

const rowsOf = (r: GaResponse): GaRow[] => r.rows ?? [];
const dim = (row: GaRow, i = 0) => row.dimensionValues?.[i]?.value ?? '';
const met = (row: GaRow, i = 0) => Number(row.metricValues?.[i]?.value ?? 0);

const dateRange = [{ startDate: LOOKBACK, endDate: 'today' }];
const byMetricDesc = (metricName: string) => [
    { metric: { metricName }, desc: true },
];

async function buildPayload() {
    const [live, sources, pages, events, reads] = await Promise.all([
        ga('runRealtimeReport', { metrics: [{ name: 'activeUsers' }] }),
        ga('runReport', {
            dateRanges: dateRange,
            dimensions: [{ name: 'sessionSourceMedium' }],
            metrics: [{ name: 'sessions' }],
            orderBys: byMetricDesc('sessions'),
            limit: 8,
        }),
        ga('runReport', {
            dateRanges: dateRange,
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'screenPageViews' }],
            orderBys: byMetricDesc('screenPageViews'),
            limit: 10,
        }),
        ga('runReport', {
            dateRanges: dateRange,
            dimensions: [{ name: 'eventName' }],
            metrics: [{ name: 'eventCount' }],
            orderBys: byMetricDesc('eventCount'),
            limit: 25,
        }),
        ga('runReport', {
            dateRanges: dateRange,
            dimensions: [{ name: 'pagePath' }],
            metrics: [{ name: 'eventCount' }],
            dimensionFilter: {
                filter: {
                    fieldName: 'eventName',
                    stringFilter: { value: 'writing_read' },
                },
            },
            orderBys: byMetricDesc('eventCount'),
            limit: 10,
        }),
    ]);

    const eventCounts: Record<string, number> = {};
    for (const r of rowsOf(events)) eventCounts[dim(r)] = met(r);

    return {
        generatedAt: new Date().toISOString(),
        lookbackDays: 28,
        liveUsers: met(rowsOf(live)[0] ?? {}),
        sources: rowsOf(sources).map((r) => ({
            sourceMedium: dim(r),
            sessions: met(r),
        })),
        topPages: rowsOf(pages).map((r) => ({ path: dim(r), views: met(r) })),
        events: eventCounts,
        highIntent: {
            resume_download: eventCounts.resume_download ?? 0,
            contact_click: eventCounts.contact_click ?? 0,
            outbound_click: eventCounts.outbound_click ?? 0,
        },
        engagement: {
            portfolio_open: eventCounts.portfolio_open ?? 0,
            writing_read: eventCounts.writing_read ?? 0,
            social_click: eventCounts.social_click ?? 0,
        },
        topReads: rowsOf(reads).map((r) => ({ path: dim(r), reads: met(r) })),
    };
}

let cache: { at: number; payload: unknown } | null = null;

interface FunctionUrlEvent {
    requestContext?: { http?: { method?: string } };
}

export const handler = async (event: FunctionUrlEvent) => {
    const cors = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event?.requestContext?.http?.method === 'OPTIONS') {
        return { statusCode: 204, headers: cors };
    }

    try {
        if (!cache || Date.now() - cache.at > CACHE_TTL_MS) {
            cache = { at: Date.now(), payload: await buildPayload() };
        }
        return {
            statusCode: 200,
            headers: {
                ...cors,
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=120',
            },
            body: JSON.stringify(cache.payload),
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { ...cors, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: (err as Error).message }),
        };
    }
};
