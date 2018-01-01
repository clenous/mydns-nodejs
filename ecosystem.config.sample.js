module.exports = {
  apps: [
    {
      name: 'mydns',
      script: 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    HOSTNAME : {
      user: 'node',
      host: 'HOSTNAME',
      port: '22',
      env: {
        ID: 'mydns******',
        PASSWORD: '********',
        SLACK_URL: 'https://hooks.slack.com/services/******/**************************'
      },
      ref: 'origin/master',
      repo: 'https://github.com/hrntknr/mydns-nodejs.git',
      path: '/var/www/mydns-nodejs',
      'post-deploy': '\
        npm install && \
        pm2 reload pm2.json --env production \
      '
    }
  }
}