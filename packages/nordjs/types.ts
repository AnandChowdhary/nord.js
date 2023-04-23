import type { Context } from "hono";
import type { ZodType, z } from "zod";

type MethodParams<
  ZodQuery extends Record<string, ZodType<any, any, any>>,
  ZodParams extends Record<string, ZodType<any, any, any>>,
  ZodBody extends ZodType<any, any, any>,
  ZodResponse extends ZodType<any, any, any>
> = {
  query: z.infer<z.ZodObject<ZodQuery>>;
  params: z.infer<z.ZodObject<ZodParams>>;
  body: z.infer<ZodBody>;
} & Context;

interface RouteParams<ZodQuery, ZodParams, ZodBody, ZodResponse> {
  scopes?: string[];
  query?: ZodQuery;
  params?: ZodParams;
  body?: ZodBody;
  response?: ZodResponse;
}

export const route = <
  ZodQuery extends Record<string, ZodType<any, any, any>>,
  ZodParams extends Record<string, ZodType<any, any, any>>,
  ZodBody extends ZodType<any, any, any>,
  ZodResponse extends ZodType<any, any, any>
>(
  routeParams: RouteParams<ZodQuery, ZodParams, ZodBody, ZodResponse>,
  method: (
    methodParams: MethodParams<ZodQuery, ZodParams, ZodBody, ZodResponse>
  ) => any
) => ({
  routeParams,
  method,
});
