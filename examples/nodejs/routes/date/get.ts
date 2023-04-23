import { route, z } from "nordjs";

/** Return the current server-side date and time */
const getDate = route(
  {
    response: z.object({ date: z.string().datetime() }),
  },
  async ({ json }) => {
    return json({ date: new Date().toISOString() });
  }
);

export default getDate;
