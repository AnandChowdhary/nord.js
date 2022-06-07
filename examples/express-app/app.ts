import { injectRoutes } from "@nordjs/core";
import express from "express";

const app = express();
const port = 3000;

injectRoutes();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
