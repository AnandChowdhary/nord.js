import { HttpException, HttpStatus } from "@nordjs/errors";
import type {
  ErrorResponse,
  Express,
  NordConfig,
  NordManifest,
  RequestHandler,
} from "@nordjs/types";
import { ZodError } from "@nordjs/validator";
import { getClientIp } from "@supercharge/request-ip";
import { access, readFile } from "fs/promises";
import { join } from "path";

const getConfig = async (): Promise<NordConfig | void> => {
  try {
    await access(join(".", "nord.config.ts"));
    const data = await readFile(join(".", "nord.config.ts"), "utf-8");
    return JSON.parse(data) as NordConfig;
  } catch (error) {
    console.log("ⓘ  No configuration file nord.config.ts found");
  }
};

let config: NordConfig = {};
let _configLoaded = false;
export const useRouter: ({
  app,
  nordManifest,
}: {
  app: Express;
  nordManifest: () => Promise<NordManifest>;
}) => void = ({ app, nordManifest }) => {
  const nordMiddleware: RequestHandler = async (request, response, next) => {
    if (!_configLoaded) {
      const loaded = await getConfig();
      if (loaded) config = loaded;
      _configLoaded = true;
    }
    const { routes } = await nordManifest();
    const globalRoutePrefixEnabledForThisRoute =
      config.globalRoutePrefix &&
      (config.globalRoutePrefixExcludes ?? []).includes(request.path);
    const key = `${request.method === "HEAD" ? "GET" : request.method} ${
      globalRoutePrefixEnabledForThisRoute ? config.globalRoutePrefix : ""
    }${request.path}`;
    const route = routes[key];
    if (!route) return next();

    try {
      const result = await route({
        route: key,
        path: request.path,
        useParams: (obj) => obj.parse(request.params),
        useQuery: (obj) => obj.parse(request.query),
        useBody: (obj) => obj.parse(request.body ?? {}),
        ipAddress: getClientIp(request),
        _original: { request, response },
      });

      if (request.method === "HEAD") {
        response.status(204);
        response.end();
      } else response.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const flat = error.flatten();
        response.status(HttpStatus.BAD_REQUEST);
        response.json({
          status: HttpStatus.BAD_REQUEST,
          message: [
            ...Object.entries(flat.fieldErrors).map((i) => `${i[0]} (${i[1]})`),
            ...Object.entries(flat.formErrors).map((i) => `${i[0]} (${i[1]})`),
          ].join(", "),
          validation: error.issues,
        } as ErrorResponse);
        response.end();
      } else if (error instanceof HttpException || "_httpException" in error) {
        const err = error as HttpException;
        response.status(err.code);
        response.json({
          status: err.code,
          message: err.message,
        } as ErrorResponse);
        response.end();
      } else {
        console.error(error);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        response.write("Error");
        response.end();
      }
    }

    return next();
  };

  app.use(nordMiddleware);
};
