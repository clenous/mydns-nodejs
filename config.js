const {ID, PASSWORD, SLACK_URL} = process.env;

module.exports = {
  cron: '00 * * * *',
  timeZone: 'Asia/Tokyo',
  accounts:[
    {
      ID: ID || 'mydns******',
      Password: PASSWORD || '***********',
      protocol: 'ipv4',
      //all ipv6 ipv4
      notify: [
        {
          type: 'slack',
          url: SLACK_URL || 'https://hooks.slack.com/services/**************************************',
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
};