/**
 * PM2 ecosystem config for the resume site (elinorbahiti.ca).
 * Serves the production build via Vite preview (optional; Nginx serves static files in production).
 * From resume dir: pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: 'resume-site',
      script: 'node_modules/.bin/vite',
      args: ['preview', '--port', '4173'],
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '150M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
