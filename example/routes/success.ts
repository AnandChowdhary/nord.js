import type { Route } from "web-framework/framework/types";

export const get: Route = async () => {
  return { success: true };
};
