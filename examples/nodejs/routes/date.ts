import { route, z } from "nordjs";

/** Return the current server-side date and time */
export const GET = route(
  {
    response: z.object({ date: z.string().datetime() }),
  },
  async ({ json }) => {
    return json({ date: new Date().toISOString() });
  }
);
