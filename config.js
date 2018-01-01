// ex) CONFIG=[{"ID":"mydns*******","PASSWORD":"******","SLACK_URL":"https://hooks.slack.com/services/**************************************"}]
const CONFIG = JSON.parse(process.env.CONFIG)

const config = {
  cron: '00 * * * *',
  timeZone: 'Asia/Tokyo',
  accounts:[
    {
      ID: 'mydns******',
      Password: '***********',
      protocol: 'all',
      //all ipv6 ipv4
      notify: [
        {
          type: 'slack',
          url: 'https://hooks.slack.com/services/**************************************',
          locale: 'en',
          format: '{ID}\n{ADDR}'
        },
        {
          type: 'console',
          locale: 'en',
          format: '{TIME(lll)} {ID} {ADDR}'
        }
      ]
    }
  ]
}

for(let i in CONFIG) {
  config.accounts[i] = {
    ID: CONFIG[i].ID,
    Password: CONFIG[i].PASSWORD
  }
  if(CONFIG[i].SLACK_URL!=null) {
    config.accounts[i].notify.push({
      type: 'slack',
      url: CONFIG[i].SLACK_URL,
      locale: 'en',
      format: '{ID}\n{ADDR}'
    })
  }
}

module.exports = config