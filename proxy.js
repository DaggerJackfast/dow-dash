const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const apiPath = process.env.API_URL
      ? new URL(process.env.API_URL).pathname
      : "/api";
    const proxyServer = process.env.PROXY_SERVER;
    const proxyPath = process.env.PROXY_PATH;
    console.log("proxyServer", proxyServer);
    console.log("proxyPath", proxyPath);

    const options = {
      target: proxyServer,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        [`^${apiPath}`]: proxyPath,
      },
      onProxyReq: (proxyReq, req, res) => {
        // Добавление заголовков, если необходимо
        proxyReq.setHeader("Authorization", req.headers["authorization"] || "");
      },
      onProxyRes: (proxyRes, req, res) => {
        // Добавление заголовков, если необходимо
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        proxyRes.headers["Access-Control-Allow-Headers"] =
          "Content-Type, Authorization";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET, POST, PUT, DELETE, OPTIONS";
      },
    };
    if (dev) {
      const proxyMiddleware = createProxyMiddleware(options);
      server.use(apiPath, proxyMiddleware);
    }
    server.all("*", (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:::::", err);
  });
