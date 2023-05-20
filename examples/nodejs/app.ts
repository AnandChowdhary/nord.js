import { Hono, init } from "nordjs";
import manifest from "./nord.gen";

const app = new Hono();
init(app, manifest);
