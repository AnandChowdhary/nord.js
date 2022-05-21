import express from "express";
import { getClientIp } from "@supercharge/request-ip";
import type { Request, Response } from "express";
import type { Route } from "@nordjs/types";

const app = express();
const port = 3000;

import { get as get_Users_anandchowdhary_Projects_web_framework_examples_express_app__ } from "./routes/Users/anandchowdhary/Projects/web-framework/examples/express-app//";
app.get("/Users/anandchowdhary/Projects/web-framework/examples/express-app//", (request, response) => {
  return transformResponse({ method: get_Users_anandchowdhary_Projects_web_framework_examples_express_app__, route: "/Users/anandchowdhary/Projects/web-framework/examples/express-app//", request, response });
});
app.head("/Users/anandchowdhary/Projects/web-framework/examples/express-app//", (request, response) => {
  return transformResponse({ method: get_Users_anandchowdhary_Projects_web_framework_examples_express_app__, route: "/Users/anandchowdhary/Projects/web-framework/examples/express-app//", request, response });
});
// inject-routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export const transformResponse = async ({
  method,
  route,
  request,
  response,
}: {
  method: Route;
  route: string;
  request: Request;
  response: Response;
}): Promise<void> => {
  const result = await method({
    route,
    path: request.path,
    ipAddress: getClientIp(request),
    body: <T>(schema?: T) => {
      const body = request.body;
      // TODO validate body
      return body as unknown as T;
    },
    _original: { request, response },
  });
  if (request.method === "HEAD") response.status(204);
  else response.json(result);
};
