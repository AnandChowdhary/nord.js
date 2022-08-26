# Configuration

To configure Nord.js, create a `nord.config.ts` file:

```ts
import type { NordConfig } from "@nordjs/types";

const config: NordConfig = {
  globalRoutePrefix: "/v1",
};

export default config;
```

## Configuration options

### `globalRoutePrefix`

For API versioning or other reasons, you can add a global prefix to your routes:

```ts
{ globalRoutePrefix: "/v1" }
```

This will add the prefix `/v1` to reach route. For example, if you have a `routes/example.ts` file that exports a `get` function (i.e., `GET /example`), this will be changed to `GET /v1/example` with the prefix.

### `globalRoutePrefixExcludes`

You can exclude certain routes from adding the global route prefix:

```ts
{
  globalRoutePrefix: "/v1",
  globalRoutePrefixExcludes: ["/example", "/users/:userId"],
}
```
