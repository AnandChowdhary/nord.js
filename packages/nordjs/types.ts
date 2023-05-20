import type { Context } from "hono";
import type { TypedResponse } from "hono/dist/types/types";
import type { StatusCode } from "hono/utils/http-status";
import type { JSONValue } from "hono/utils/types";
import type { ZodType, z } from "zod";

declare type HeaderRecord = Record<string, string | string[]>;
interface JSONRespond<T> {
  (object: T, status?: StatusCode, headers?: HeaderRecord): Response;
  (object: T, init?: ResponseInit): Response;
}
interface JSONTRespond<T> {
  (
    object: T extends JSONValue ? T : JSONValue,
    status?: StatusCode,
    headers?: HeaderRecord
  ): TypedResponse<
    T extends JSONValue ? (JSONValue extends T ? never : T) : never
  >;
  (
    object: T extends JSONValue ? T : JSONValue,
    init?: ResponseInit
  ): TypedResponse<
    T extends JSONValue ? (JSONValue extends T ? never : T) : never
  >;
}

export type MethodParams<
  ZodQuery extends Record<string, ZodType<any, any, any>>,
  ZodParams extends Record<string, ZodType<any, any, any>>,
  ZodBody extends ZodType<any, any, any>,
  ZodResponse extends ZodType<any, any, any>
> = Omit<Context, "json" | "jsonT"> & {
  query: z.infer<z.ZodObject<ZodQuery>>;
  params: z.infer<z.ZodObject<ZodParams>>;
  body: z.infer<ZodBody>;
  json: JSONRespond<z.infer<ZodResponse>>;
  jsonT: JSONTRespond<z.infer<ZodResponse>>;
};

export interface RouteParams<
  ZodQuery extends Record<string, ZodType<any, any, any>>,
  ZodParams extends Record<string, ZodType<any, any, any>>,
  ZodBody extends ZodType<any, any, any>,
  ZodResponse extends ZodType<any, any, any>
> {
  scopes?: string[];
  query?: ZodQuery;
  params?: ZodParams;
  body?: ZodBody;
  response?: ZodResponse;
}

export type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "head"
  | "options"
  | "patch";

export type Manifest = {
  routes: {
    method: Method;
    pathname: string;
    route: {
      routeParams: any;
      method: (methodParams: any) => Response | Promise<Response>;
    };
  }[];
};
