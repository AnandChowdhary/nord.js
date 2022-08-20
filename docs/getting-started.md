# Getting started

**Nord.js is a fast, familiar backend framework for building RESTful APIs in TypeScript.** If you've used a frontend framework like Next.js in the past, you can already start building your backend with Nord.js with little additional understanding required. To make development easy, it has built-in features like data validation and file-based routing.

## Using the template

The easiest way to get started is using the [degit](https://github.com/Rich-Harris/degit) project scaffolding tool and cloning our example repository, which sets up Nord.js in an Express application:

```bash
npx degit AnandChowdhary/nord.js/examples/express-app my-app
```

Note that you will need to have a supported version of Node.js installed, preferably 16.17.0 LTS. Then, you can enter the newly created `my-app` directory and install dependencies:

```bash
cd my-app
npm install
```

To start a local development server, use the `nord dev` command and provide your favorite port:

```bash
nord dev --port=3000
```

To build and typecheck:

```bash
nord build
```

## Starting from scratch

Alternately, you can set up a Nord.js project from scratch using the instructions below.

Install Nord.js and Express from npm:

```bash
npm install @nordjs/cli @nordjs/core @nordjs/errors @nordjs/validator express
```

Install types as dev dependencies:

```bash
npm install @nordjs/types @types/express --save-dev
```

Create a directory structure like so:

```
your-app-name
│   app.ts
│   tsconfig.json
└───routes
│   │   index.ts
│   │   success.ts
│   └───users
│       │   index.ts
│       │   [id].ts
│       │   ...
```

### `tsconfig.json`

Your TypeScript configuration file should enable strict mode (set `{ "strict": true }` under `compilerOptions`), or at least set `strictNullChecks` to `true` for strong types when using validation hooks:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### `app.ts`

Each Nord.js application requires an `app.ts` file, which is the main entry point, and it should look like the following:

```ts
import { useRouter } from "@nordjs/core";
import express from "express";
import { nordManifest } from "./nord.gen";

const app = express();
const port = process.env.PORT;

useRouter({ app, nordManifest });

app.listen(port, () => {
  console.log(`✅ Listening on port ${port}`);
});
```

This file sets up your Express application. To enable hot reloading for your development environment, you should use `process.env.PORT` instead of hardcoding a particular port, and the CLI will inject it as an environment variable.

```bash
nord dev --port=3000
```

The most important line in this file adds the Nord.js middleware which handles routing:

```ts
useRouter({ app, nordManifest });
```
