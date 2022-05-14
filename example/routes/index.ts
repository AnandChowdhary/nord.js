import type { Route } from "web-framework/framework/types";

export const get: Route = async () => {
  return { success: true, key: Math.random().toString(32).substring(2) };
};
