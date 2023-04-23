import type { ZodType } from "zod";
import type { MethodParams, RouteParams } from "./types";

export const route = <
  ZodQuery extends Record<string, ZodType<any, any, any>>,
  ZodParams extends Record<string, ZodType<any, any, any>>,
  ZodBody extends ZodType<any, any, any>,
  ZodResponse extends ZodType<any, any, any>
>(
  routeParams: RouteParams<ZodQuery, ZodParams, ZodBody, ZodResponse>,
  method: (
    methodParams: MethodParams<ZodQuery, ZodParams, ZodBody, ZodResponse>
  ) => Response | Promise<Response>
) => ({
  routeParams,
  method,
});
