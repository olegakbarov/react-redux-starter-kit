# React Redux Starter Kit

A universal React + Redux frontend starter kit following best practices: PWA‑optimized, server‑side rendering, offline‑first service workers, background prefetching, and more. ([github.com][1])

---

## 🚀 Features

* **Universal rendering** (client + server)
* **Progressive Web App (PWA)** • Offline-first with service workers
* **Prefetching** background data loading
* **Notification and Alerts** system built-in
* **Service-worker caching** for offline resilience
* **React 15 + Redux + redux-thunk** support
* **React Router v4**, `axios` for API calls
* **CSS Modules + normalize.css** for modular styling
* **Babel + Webpack optimized**
* **Docker support** via included `Dockerfile` ([github.com][1], [github.com][2], [github.com][3])

---

## 📦 Quick Start

```bash
git clone https://github.com/olegakbarov/react-redux-starter-kit.git
cd react-redux-starter-kit
npm install
```

In development:

```bash
npm run dev
```

This starts the server with hot reloading and universal rendering.
For production:

```bash
npm run build         # (configurable via webpack)
npm start             # or run the built server bundle
```

For Docker deployments:

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

---

## ⚙️ Project Structure

```
.
├── src/
│   ├── components/       # Presentational UI components
│   ├── containers/       # Redux-connected containers
│   ├── api/              # API utility (axios) & service workers
│   └── index.js          # Client‍/‍server bootstrap
├── server.js             # Express server & SSR middleware
├── webpack/              # Webpack configs (dev & prod)
├── Dockerfile            # Docker build config
├── package.json          # Dependencies & npm scripts :contentReference[oaicite:16]{index=16}
└── .babelrc/.eslintrc    # Transpilation & linting settings
```

---

## 🔧 Configuration

* **Service Worker**: Ensure the `sw.js` output is served.
* **Environment Variables**: Use `.env` and `dotenv` for configs.
* **Redux Thunk & Logger**: Manage async workflows and debug info.
* **CSS Modules + normalize.css**: Scoped styles with a CSS reset.

---

## 🧩 Adding Features

* Add reducers, actions, and containers in their respective directories.
* Extend the `server.js` Express app to add REST endpoints.
* Customize Webpack for advanced builds or new assets.

---

## ✅ Testing (Coming Soon)

Test setup is included (e.g. `ava` config), but **test scripts** (e.g. `npm test`) still need to be implemented and integrated into CI workflows.

---

## 🌐 Docker

The included `Dockerfile` shows an example of building a production image:

```Dockerfile
FROM node:10
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build
CMD ["node", "build/server-bundle.js"]
```

You can customize this for multi-stage builds or add runtime dependencies. ([github.com][1], [github.com][2])

---

## 📋 Roadmap

* Enable full **tree-shaking**
* Update Babel presets/plugins
* Further **PWA enhancements**
* Integrate **modern React** features (hooks, Suspense, SSR patterns)

---

## 👥 Contributors

* **Oleg Akbarov** – Author
* **Sergey Slipchenko** – Contributor ([github.com][2], [github.com][1], [github.com][4])

---

## 📄 License

Licensed under the **MIT** License.&#x20;

---

## 🧠 Summary

This kit is a solid foundation for building universal React + Redux applications with PWA capabilities. It handles server-side rendering, offline-first design, and background prefetching out of the box, and is meant for developers who want a best-practice baseline to build upon.

---

Let me know if you'd like sections added for API architecture, examples of Redux workflows, or CI/CD!

[1]: https://github.com/olegakbarov/react-redux-starter-kit?utm_source=chatgpt.com "olegakbarov/react-redux-starter-kit - GitHub"
[2]: https://github.com/olegakbarov/react-redux-starter-kit/blob/master/package.json?utm_source=chatgpt.com "package.json - olegakbarov/react-redux-starter-kit - GitHub"
[3]: https://github.com/cloudmu/react-redux-starter-kit?utm_source=chatgpt.com "cloudmu/react-redux-starter-kit - GitHub"
[4]: https://github.com/dvdzkwsk/react-redux-starter-kit?utm_source=chatgpt.com "dvdzkwsk/react-redux-starter-kit - GitHub"
