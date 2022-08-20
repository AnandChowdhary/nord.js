# Routing

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
export const post: Route = async ({ useBody }) => {
  const data = useBody(z.object({
    name: z.string().optional(),
    email: z.string().email(),
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
export const del: Route = async ({ useParams }) => {
  const { id } = useParams(params);
  await deleteUser(id);
  return { success: true };
}

// Update a user
// PATCH /users/:id
export const patch: Route = async ({ useBody, useParams }) => {
  const { id } = useParams(params);
  const data = useBody(z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }));
  const result = await updateUser(id, data);
  return result;
}
```
