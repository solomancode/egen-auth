module.exports = {
  apps: [
    {
      name: "api",
      script: "cd packages/api && node ./dist/main.js",
    },
    {
      name: "web",
      script: "cd apps/web && next start",
    },
  ],
};
