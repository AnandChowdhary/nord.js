import { injectRoutes } from "@nordjs/core";
import express from "express";
import { nordManifest } from "./nord.gen";

const app = express();
const port = process.env.PORT;

app.use(injectRoutes(nordManifest));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
