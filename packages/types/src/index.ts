import type { ZodType, ZodTypeDef } from "@nordjs/validator";
import type { Request, Express, RequestHandler, Response } from "express";
import type { JsonValue, Promisable } from "type-fest";
export { Express, RequestHandler };

type ZordParse = <
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
>(
  x: ZodType<Output, Def, Input>
) => ReturnType<ZodType<Output, Def, Input>["parse"]>;

export interface RequestParams {
  route: string;
  path: string;
  ipAddress: string;
  useBody: ZordParse;
  useQuery: ZordParse;
  useParams: ZordParse;
  _original: { request: Request; response: Response };
}

export type ApiResponse = Response | JsonValue | object;

export type Route = (params: RequestParams) => Promisable<ApiResponse>;

export interface NordManifest {
  schemaVersion: "0.0.0";
  routes: Record<string, Route>;
}
