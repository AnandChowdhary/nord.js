import{_ as s,c as a,o as n,a as p}from"./app.58eb6ab7.js";const F=JSON.parse('{"title":"Getting started","description":"","frontmatter":{},"headers":[{"level":2,"title":"Using the template","slug":"using-the-template"},{"level":2,"title":"Starting from scratch","slug":"starting-from-scratch"},{"level":3,"title":"tsconfig.json","slug":"tsconfig-json"},{"level":3,"title":"app.ts","slug":"app-ts"}],"relativePath":"getting-started.md"}'),e={name:"getting-started.md"},o=p(`<h1 id="getting-started" tabindex="-1">Getting started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p><strong>Nord.js is a fast, familiar backend framework for building RESTful APIs in TypeScript.</strong> If you&#39;ve used a frontend framework like Next.js in the past, you can already start building your backend with Nord.js with little additional understanding required. To make development easy, it has built-in features like data validation and file-based routing.</p><h2 id="using-the-template" tabindex="-1">Using the template <a class="header-anchor" href="#using-the-template" aria-hidden="true">#</a></h2><p>The easiest way to get started is using the <a href="https://github.com/Rich-Harris/degit" target="_blank" rel="noreferrer">degit</a> project scaffolding tool and cloning our example repository, which sets up Nord.js in an Express application:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npx degit AnandChowdhary/nord.js/examples/node-express my-app</span></span>
<span class="line"></span></code></pre></div><p>Note that you will need to have a supported version of Node.js installed, preferably 16.17.0 LTS. Then, you can enter the newly created <code>my-app</code> directory and install dependencies:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> my-app</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"></span></code></pre></div><p>To start a local development server, use the <code>nord dev</code> command and provide your favorite port:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">nord dev --port=3000</span></span>
<span class="line"></span></code></pre></div><p>To build and typecheck:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">nord build</span></span>
<span class="line"></span></code></pre></div><h2 id="starting-from-scratch" tabindex="-1">Starting from scratch <a class="header-anchor" href="#starting-from-scratch" aria-hidden="true">#</a></h2><p>Alternately, you can set up a Nord.js project from scratch using the instructions below.</p><p>Install Nord.js and Express from npm:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm install @nordjs/cli @nordjs/core @nordjs/errors @nordjs/validator express</span></span>
<span class="line"></span></code></pre></div><p>Install types as dev dependencies:</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm install @nordjs/types @types/express --save-dev</span></span>
<span class="line"></span></code></pre></div><p>Create a directory structure like so:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">your-app-name</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   app.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   tsconfig.json</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500\u2500routes</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502   index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502   success.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2514\u2500\u2500\u2500users</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502       \u2502   index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502       \u2502   [id].ts</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502       \u2502   ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="tsconfig-json" tabindex="-1"><code>tsconfig.json</code> <a class="header-anchor" href="#tsconfig-json" aria-hidden="true">#</a></h3><p>Your TypeScript configuration file should enable strict mode (set <code>{ &quot;strict&quot;: true }</code> under <code>compilerOptions</code>), or at least set <code>strictNullChecks</code> to <code>true</code> for strong types when using validation hooks:</p><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">strictNullChecks</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="app-ts" tabindex="-1"><code>app.ts</code> <a class="header-anchor" href="#app-ts" aria-hidden="true">#</a></h3><p>Each Nord.js application requires an <code>app.ts</code> file, which is the main entry point, and it should look like the following:</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useRouter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nordjs/core</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> express </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nordManifest</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./nord.gen</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">express</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> port </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">PORT</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">useRouter</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> app</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nordManifest </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(port</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">\u2705 Listening on port </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">port</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>This file sets up your Express application. To enable hot reloading for your development environment, you should use <code>p<wbr>rocess.env.PORT</code> instead of hardcoding a particular port, and the CLI will inject it as an environment variable.</p><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">nord dev --port=3000</span></span>
<span class="line"></span></code></pre></div><p>The most important line in this file adds the Nord.js middleware which handles routing:</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#82AAFF;">useRouter</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> app</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> nordManifest </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,29),l=[o];function t(r,c,i,d,y,D){return n(),a("div",null,l)}const C=s(e,[["render",t]]);export{F as __pageData,C as default};