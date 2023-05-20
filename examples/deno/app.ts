import { serve } from "https://deno.land/std/http/server.ts";
import { Hono, init } from "../../packages/nordjs";
import manifest from "./nord.gen";

const app = new Hono();
init(app, manifest);

serve(app.fetch);
