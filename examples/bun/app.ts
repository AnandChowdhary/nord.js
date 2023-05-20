import { Hono, init } from "../../packages/nordjs";
import manifest from "./nord.gen";

const app = new Hono();
init(app, manifest);

export default app;
