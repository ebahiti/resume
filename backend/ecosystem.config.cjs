/**
 * PM2 config for resume contact form API (elinorbahiti.ca).
 * From resume/backend: pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: 'resume-contact-api',
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
      },
    },
  ],
}
