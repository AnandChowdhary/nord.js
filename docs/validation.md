# Validation

Nord.js comes with built-in data validation using [zod](https://github.com/colinhacks/zod). You can use the validation helper directly or hooks for request properties.

When you use any validation hook and if the JSON body of the request does not match the expected body schema, an HTTP 400 Bad Request exception will be thrown with details about what's wrong. For example:

```json
{
  "status": 400,
  "message": "id (Required)",
  "validation": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["id"],
      "message": "Required"
    }
  ]
}
```

## Validation hooks

Validation hooks are present as properties in the route function argument.

### `useBody`

Access request JSON body, for example `POST /register` in the path `routes/register.ts`:

```ts
import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";

export const POST: Route = async ({ useBody }) => {
  const data = useBody(
    z.object({
      name: z.string().optional(),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string",
        })
        .email(),
      password: z
        .string()
        .min(8, { message: "Password must be 8 characters or longer" }),
    })
  );
  return data;
};
```

### `useQuery`

Access URL query parameters, for example `GET /example?id=user_2a3e00bc` in the path `routes/example.ts`:

```ts
import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";

export const GET: Route = async ({ useQuery }) => {
  const data = useQuery(
    z.object({
      id: z.string().startsWith("user_", {
        message: "User ID must start with the prefix user_",
      }),
    })
  );
  return data;
};
```

### `useParams`

Access URL query parameters, for example `GET /users/user_2a3e00bc` in the path `routes/users/_id.ts`:

```ts
import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";

export const GET: Route = async ({ useParams }) => {
  const data = useParams(
    z.object({
      id: z.string().startsWith("user_", {
        message: "User ID must start with the prefix user_",
      }),
    })
  );
  return data;
};
```
