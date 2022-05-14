# Untitled web framework

An ultra-fast backend framework for building Node.js apps with TypeScript, powered by [swc](https://github.com/swc-project/swc).

## Features

- ⚡️ Very fast: startup time with hundreds of endpoints is <10ms
- 📑 File-based routing
- 💪 Strong types by default

## Example

Create a file `routes/index.ts` with the following code:

```ts
import type { Route } from "web-framework/framework/types";

export const get: Route = async ({ request }) => {
  return { hello: request.query.name ?? "world" };
};

export const post: Route = async ({ request }) => {
  return { hello: request.body.name ?? "world" };
};
```

When you run your application, the following responses are expected:

```
GET /            { hello: "world" }
GET /?name=Anand { hello: "Anand" }
POST /           { hello: "Anand" }
```
