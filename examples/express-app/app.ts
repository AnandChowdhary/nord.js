import { injectRoutes } from "@nordjs/core";
import express from "express";
import { nordManifest } from "./nord.gen";

const app = express();
const port = process.env.PORT;

app.use(injectRoutes(nordManifest));

function errorHandler(err, req, res, next) {
  console.log("got here");
  // console.log(err, req, res);
  // res.status(500);
  // res.render("error", { error: err });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Listening on port ${port}`);
});
