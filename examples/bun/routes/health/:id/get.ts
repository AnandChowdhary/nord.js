import { route, z } from "../../../../../packages/nordjs";

const getHealthId = route(
  {
    params: { id: z.string() },
    response: z.object({ success: z.string() }),
  },
  async ({ params: { id }, json }) => {
    return json({ success: id });
  }
);

export default getHealthId;
