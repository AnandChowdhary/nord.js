import type { z, ZodObject, ZodRawShape, ZodType } from "@nordjs/validator";
import type { Request, RequestHandler, Response } from "express";
import type { JsonValue, Promisable } from "type-fest";

export { RequestHandler };

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  body: <T extends ZodRawShape>(
    type: ZodObject<T>
  ) => ReturnType<ZodType<T>["parse"]>>;
  query: <T extends ZodRawShape>(
    type: ZodObject<T>
  ) => ReturnType<ZodType<T>["parse"]>>;
  params: Request["params"];
  _original: { request: Request; response: Response };
}

export type ApiResponse = Response | JsonValue | object;

export type Route = (params: RequestParams) => Promisable<ApiResponse>;

export interface NordManifest {
  schemaVersion: "0.0.0";
  routes: Record<string, Route>;
}
