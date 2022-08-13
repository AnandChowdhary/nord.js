# Nord.js

**Nord.js** is a fast, familiar backend framework for building RESTful APIs in TypeScript.

> **Warning**
> This is a very early, experimental prototype; please don't use it in production!

- ⚡️ Extremely fast (based on swc)
- 💪 First-class TypeScript support
- 🗂 File-based routing
- ✅ Built-in data validation

## CLI

To start a local development server:

```bash
nord dev --port=3000
```

To build and check types:

```bash
nord build
```

## Getting started

Install Nord.js and Express from npm:

```bash
npm install @nordjs/cli @nordjs/core @nordjs/errors @nordjs/validator express
```

Install types as dev dependencies:

```bash
npm install –save-dev @nordjs/types @types/express
```

Create a directory structure like so:

```
your-app-name
│   app.ts
│   tsconfig.json
└───routes
│   │   index.ts
│   │   success.ts
│   └───users
│       │   index.ts
│       │   [id].ts
│       │   ...
```

### `tsconfig.json`

Your TypeScript configuration file should enable strict mode (set `{ "strict": true }` under `compilerOptions`), or at least set `strictNullChecks` to `true` for strong types when using validation hooks:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### `app.ts`

Each Nord.js application requires an `app.ts` file, which is the main entry point, and it should look like the following:

```ts
import { injectRoutes } from "@nordjs/core";
import express from "express";
import { nordManifest } from "./nord.gen";

const app = express();
const port = process.env.PORT;

app.use(injectRoutes(nordManifest));

app.listen(port, () => {
  console.log(`✅ Listening on port ${port}`);
});
```

This file sets up your Express application. To enable hot reloading for your development environment, you should use `process.env.PORT` instead of hardcoding a particular port, and the CLI will inject it as an environment variable.

```bash
nord dev --port=3000
```

The most important line in this file adds the Nord.js middleware which handles routing:

```ts
app.use(injectRoutes(nordManifest));
```

### `routes`

Nord.js uses file-based routing, similar to frontend frameworks like Next.js, Remix, Nuxt, and SvelteKit. Each TypeScript file inside the `routes` directory can export multiple functions, one for each HTTP method.

For example, create the following file `routes/success.ts`:

```ts
export const get = () => {
  return { success: true };
};
```

This will expose an endpoint `GET /success` which will return the JSON body `{ "success": true }`.

To use the request body, query parameters, or search parameters, you can use hooks provided as properties of the exported function argument. For example, the `useBody` hook returns the request body after validating it using [zod](https://github.com/colinhacks/zod). This also means that your body is strongly typed based on the provided schema:

```ts
// routes/users/index.ts
import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";
import { createUser } from "../../database.ts";

// Create a new user
// POST /routes/users
export const post: Route = ({ useBody }) => {
  const data = useBody(z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8, { message: "Password must be 8 characters or longer" })
  }));
  const user = await createUser(data);
  return { success: true, result: user };
};
```

In the above example, the type of `data` will be:

```ts
const data: {
  name?: string;
  email: string;
  password: string;
} = useBody(/**/);
```

Similarly, route parameters and other HTTP verbs can be used:

```ts
// routes/users/[id].ts
import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";
import { NotFoundException } from "@nordjs/errors";
import { getUser, deleteUser, updateUser } from "../../database.ts";

const params = { id: z.string().startsWith("user_") };

// Get a user
// GET /users/:id
export const get: Route = ({ useParams }) => {
  const { id } = useParams(params);
  const found = getUser(id);
  if (!found) throw new NotFoundException("User not found");
  return found;
}

// Delete a user
// DELETE /users/:id
export const del: Route = ({ useParams }) => {
  const { id } = useParams(params);
  await deleteUser(id);
  return { success: true };
}

// Update a user
// PATCH /users/:id
export const patch: Route = ({ useParams }) => {
  const { id } = useParams(params);
  const data = useBody(z.object({
    name: z.string().optional(),
    email: z.email().optional(),
  }));
  const result = await updateUser(id, data);
  return result;
}
```

## License

MIT © [Anand Chowdhary](https://anandchowdhary.com)
