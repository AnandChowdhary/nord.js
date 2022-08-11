import { z, ZodRawShape, ZodType, ZodObject } from "@nordjs/validator";
import type { Request, RequestHandler, Response } from "express";
import type { JsonValue } from "type-fest";

export { RequestHandler };

const User = z.object({
  username: z.string(),
});
User.parse({ username: "Ludwig" });

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  body: <T extends ZodRawShape>(
    type: ZodObject<T>
  ) => ReturnType<ZodType<T>["parse"]>;
  query: any;
  params: Request["params"];
  _original: { request: Request; response: Response };
}

export type ApiResponse = Response | JsonValue;

export type Route = (params: RequestParams) => ApiResponse;

export interface NordManifest {
  schemaVersion: "0.0.0";
  routes: Record<string, Route>;
}
