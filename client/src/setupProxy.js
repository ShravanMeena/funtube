const { createProxyMiddleware, proxy } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//       changeOrigin: true,
//       Connection: "keep-alive",
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8000",
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
