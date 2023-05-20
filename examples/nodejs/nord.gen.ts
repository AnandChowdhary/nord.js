// This file is generated by Nord.js
// Do not edit this file directly
import type { Manifest } from "nordjs";
import $0 from "./routes/date/get.js";
import $2 from "./routes/health/:id/get.js";
import $1 from "./routes/health/get.js";

const manifest: Manifest = {
  routes: [
    {
      route: $0,
      method: "get",
      pathname: "/date",
    },
    {
      route: $1,
      method: "get",
      pathname: "/health",
    },
    {
      route: $2,
      method: "get",
      pathname: "/health/:id",
    },
  ],
};

export default manifest;
