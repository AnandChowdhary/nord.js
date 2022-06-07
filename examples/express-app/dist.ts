import { injectRoutes } from "@nordjs/core";
import express from "express";

const app = express();
const port = 3000;

import { get as get_ } from "./routes/";
app.get("/", (request, response) => {
  return injectRoutes({ method: get_, route: "/", request, response });
});
app.head("/", (request, response) => {
  return injectRoutes({ method: get_, route: "/", request, response });
});
import { get as get_success } from "./routes/success";
app.get("/success", (request, response) => {
  return injectRoutes({ method: get_success, route: "/success", request, response });
});
app.head("/success", (request, response) => {
  return injectRoutes({ method: get_success, route: "/success", request, response });
});
import { post as post_success } from "./routes/success";
app.post("/success", (request, response) => {
  return injectRoutes({ method: post_success, route: "/success", request, response });
});
injectRoutes();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
