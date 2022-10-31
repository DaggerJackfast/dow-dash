const express = require('express');
const next = require('next');
const { createProxyMiddleware: proxy } = require('http-proxy-middleware');

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const apiPath = process.env.NEXT_PUBLIC_API_PATH || '/api'
const app = next({dev})
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const server = express();
  const destinationApiUrl = process.env.API_URL;
  if (dev) {
    server.use(apiPath, proxy({
        target: destinationApiUrl,
        changeOrigin: true,
      })
    );
  }
  server.all('*', (req, res) => handle(req, res))
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
  console.log('Error:::::', err)
})
