import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

// inject-routes

export const transformRequestParams = (
  request: Request,
  response: Response
) => {
  return { request, response };
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
