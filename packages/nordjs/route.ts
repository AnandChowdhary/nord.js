import type { Hono } from "hono";
import { URLPattern } from "urlpattern-polyfill";
import { ZodType, z } from "zod";
import type { Manifest, MethodParams, RouteParams } from "./types.js";

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

export const init = async (app: Hono, { routes }: Manifest) => {
  routes.forEach(({ method: verb, pathname, route: _route }) => {
    app[verb as "get"](
      pathname,
      async ({
        req,
        event,
        executionCtx,
        res,
        runtime,
        body: uncheckedBody,
        json,
        jsonT,
        ...context
      }) => {
        try {
          const { routeParams, method } = _route as ReturnType<typeof route>;
          const pattern = new URLPattern({ pathname });
          const uncheckedQuery = Object.fromEntries(
            new URLSearchParams(pattern.search)
          );
          const match = pattern.exec(req.url);
          if (!match) throw new Error("No match");

          const params = routeParams.params
            ? await z
                .object(routeParams.params)
                .parseAsync(match.pathname.groups)
            : {};

          const query = routeParams.query
            ? await z.object(routeParams.query).parseAsync(uncheckedQuery)
            : {};

          const body =
            (await routeParams.body?.parseAsync(uncheckedBody)) ?? {};

          const result = await method({
            ...context,
            req,
            event,
            executionCtx,
            res,
            runtime,
            query,
            params,
            body,
            json,
            jsonT,
          });
          return result;
        } catch (error) {
          console.error(error);
        }
      }
    );
  });
};
