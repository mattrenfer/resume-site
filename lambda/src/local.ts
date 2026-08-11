// Local smoke test: runs the handler against real GA4 with your credentials so
// you can confirm it returns your numbers BEFORE deploying.
//
//   1. create lambda/.env  (gitignored) with:
//        GA4_PROPERTY_ID=548524418
//        GA_SERVICE_ACCOUNT_KEY=<base64 of your service-account JSON>
//   2. npm run build && npm run local

import { handler } from './handler.js';

const res = await handler({ requestContext: { http: { method: 'GET' } } });
console.log('status:', res.statusCode);
console.log(JSON.stringify(JSON.parse(res.body ?? '{}'), null, 2));
