const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/static",
      "/media",
    ],
    target: 'http://192.168.0.30:3000',
    secure: false,
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
