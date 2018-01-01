const config = require('./config')

const cron = require('cron').CronJob
const main = require('./main')

new cron({
  cronTime: config.cron,
  onTick: ()=>{
    main(config.accounts)
  },
  start: true,
  timeZone: config.timeZone
})

process.on('unhandledRejection', err=>console.error(err.stack))

main(config.accounts)