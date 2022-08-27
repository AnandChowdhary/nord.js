import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Nord.js",
  description:
    "Nord.js is a fast, familiar backend framework for building RESTful APIs in TypeScript.",
  themeConfig: {
    logo: "/assets/logo.svg",
    siteTitle: false,
    nav: [
      { text: "Documentation", link: "/about" },
      { text: "Tutorials", link: "/tutorials" },
      { text: "GitHub", link: "https://github.com/AnandChowdhary/nord.js" },
    ],
    sidebar: [
      {
        text: "About",
        items: [{ text: "About Nord.js", link: "/about" }],
      },
      {
        text: "Introduction",
        items: [
          { text: "Getting started", link: "/getting-started" },
          { text: "Configuration", link: "/configuration" },
          { text: "Routing", link: "/routing" },
          { text: "Validation", link: "/validation" },
          { text: "Middleware", link: "/middleware" },
          { text: "Error handling", link: "/error-handling" },
          { text: "Testing", link: "/testing" },
          { text: "Static files", link: "/static-files" },
          { text: "Deployment", link: "/deployment" },
        ],
      },
      {
        text: "Tutorials",
        items: [
          { text: "Database", link: "/tutorials/database-prisma" },
          { text: "Caching", link: "/tutorials/caching" },
          { text: "Task scheduling", link: "/tutorials/task-scheduling" },
          { text: "Queues", link: "/tutorials/queues" },
          { text: "Logging", link: "/tutorials/logging" },
          { text: "Cookies", link: "/tutorials/cookies" },
          { text: "Events", link: "/tutorials/events" },
          { text: "Compression", link: "/tutorials/compression" },
          { text: "Rate limiting", link: "/tutorials/rate-limiting" },
          { text: "CORS", link: "/tutorials/cors" },
          { text: "Health checks", link: "/tutorials/health-checks" },
          { text: "Helmet", link: "/tutorials/helmet" },
          { text: "Server-sent events", link: "/tutorials/server-sent-events" },
        ],
      },
    ],
    editLink: {
      pattern: "https://github.com/AnandChowdhary/nord.js/blob/main/docs/:path",
    },
    footer: {
      message: "Released under the MIT License",
      copyright: "A project by Anand Chowdhary",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/icon.svg",
      },
    ],
  ],
});
