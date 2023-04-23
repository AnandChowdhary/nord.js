import { route, z } from "nordjs";

/** Check if the API is up by responding with a success message or challenge */
export const GET = route(
  {
    query: { challenge: z.string().optional() },
    response: z.union([
      z.object({ challenge: z.string() }),
      z.object({ success: z.literal(true) }),
    ]),
  },
  async ({ query: { challenge }, json }) => {
    if (challenge) return json({ challenge });
    return json({ success: true });
  }
);
