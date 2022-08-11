import type { Route } from "@nordjs/types";
import { z } from "@nordjs/validator";

export const get: Route = ({ body }) => {
  const { id } = body(z.object({ id: z.string() }));
  return { success: { id } };
};
