// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'business-health-checker', // 你的应用名称
      script: 'bun',                    // 运行 Bun
      args: 'run ./check/business-health.ts', // 传递给 Bun 的参数
      exec_mode: 'fork',                // 进程模式，fork 模式即可
      watch: false,                     // 监控文件变化，生产环境建议关闭
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};