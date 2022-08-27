# [![Nord.js](./docs/assets/logo.svg)](https://nord.js.org)

**Nord.js** is a fast, familiar backend framework for building RESTful APIs in TypeScript.

> **Warning**
> This is a very early, experimental prototype; please don't use it in production!

- ⚡️ Extremely fast (based on swc)
- 💪 First-class TypeScript support
- 🗂 File-based routing
- ✅ Built-in data validation

## ⭐️ Getting started

The easiest way to get started is using the [degit](https://github.com/Rich-Harris/degit) project scaffolding tool and cloning our example repository, which sets up Nord.js in an Express application:

```bash
npx degit AnandChowdhary/nord.js/examples/node-express my-app
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

To start the application in production:

```bash
nord start --port=3000 --mode=production
```

## 💻 Docs

- [Getting started](https://nord.js.org/getting-started.html)
- Configuration
- [Routing](https://nord.js.org/routing.html)
- Validation
- Middleware
- Error handling
- Testing
- Static files
- Deployment

## 📄 License

- Nord.js source code: [MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
- Nord.js logo and docs: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) © [Anand Chowdhary](https://anandchowdhary.com)
- Nord.js icon: [CC BY 3.0](https://thenounproject.com/legal/terms-of-use/#icon-licenses) © [Chris Kerr](https://thenounproject.com/chrisk3rr/) from the [Noun Project](https://thenounproject.com/icon/hexagon-30707/)
