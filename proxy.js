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
    const apiPath = process.env.API_URL || "/api";
    const proxyServer = process.env.PROXY_SERVER;
    const proxyPath = process.env.PROXY_PATH;

    const options = {
      target: proxyServer,
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        [`^${apiPath}`]: proxyPath,
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
