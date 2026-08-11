# Analytics Lambda — GA4 Data API → dashboard JSON

Serverless backend for the matthewrenfer.com live dashboard. Holds the GA4
service-account key server-side and returns aggregate JSON the static dashboard
fetches. Uses the GA4 Data API over REST (google-auth-library), bundled with
esbuild into a ~180 KB zip.

## What it returns

`GET` the Function URL → JSON:

```jsonc
{
  "generatedAt": "…",
  "liveUsers": 3,                       // Realtime API — active users now
  "sources":   [{ "sourceMedium": "linkedin / referral", "sessions": 12 }, …],
  "topPages":  [{ "path": "/writing/poetry/", "views": 47 }, …],
  "events":    { "portfolio_open": 40, "writing_read": 99, … },
  "highIntent":{ "resume_download": 6, "contact_click": 1, "outbound_click": 1 },
  "engagement":{ "portfolio_open": 40, "writing_read": 99, "social_click": 1 },
  "topReads":  [{ "path": "/writing/poetry/these-rooms/", "reads": 8 }, …]
}
```

Responses are cached in the warm container for 2 min (fast + within GA4 quota).

## 1. Base64-encode the service-account key

**Git Bash / Linux:** `base64 -w0 your-key.json`
**PowerShell:** `[Convert]::ToBase64String([IO.File]::ReadAllBytes("your-key.json"))`

Copy the single-line output — that's the `GA_SERVICE_ACCOUNT_KEY` value.

## 2. Test locally first (with your real key)

```bash
cd lambda
npm install
printf 'GA4_PROPERTY_ID=548524418\nGA_SERVICE_ACCOUNT_KEY=<paste base64>\n' > .env   # .env is gitignored
npm run build
npm run local        # prints status 200 + your real GA4 JSON
```

If that prints your numbers, the code is good — deploy it.

## 3. Deploy to AWS Lambda (Console, ~10 min)

1. **Lambda → Create function** → *Author from scratch*. Name `matthewrenfer-analytics`, Runtime **Node.js 20.x** → Create.
2. **Code** tab → **Upload from → .zip file** → select `lambda/function.zip` (created by `npm run build`).
3. **Runtime settings → Edit → Handler** = `index.handler`.
4. **Configuration → Environment variables** → add:
   - `GA4_PROPERTY_ID` = `548524418`
   - `GA_SERVICE_ACCOUNT_KEY` = *(the base64 string)*
   - `ALLOWED_ORIGIN` = `https://matthewrenfer.com` *(optional; this is the default)*
5. **Configuration → General configuration → Edit** → **Timeout ≈ 10s**, **Memory 256 MB** → Save. *(The default 3s timeout is too short for 5 GA calls.)*
6. **Configuration → Function URL → Create function URL** → Auth type **NONE** (data is aggregate/public) → expand **Configure CORS**: Allow origin `https://matthewrenfer.com`, Allow method `GET` → Save. **Copy the Function URL.**
7. **Verify:** open the Function URL in a browser → you should see the JSON.
8. *(Recommended)* set a **CloudWatch billing alarm** at ~$1 for peace of mind.

Send me the **Function URL** and I'll wire the dashboard to it.

## Rebuild after code changes

```bash
cd lambda && npm run build      # → function.zip, re-upload in the Code tab
```
