const {ID, PASSWORD, SLACK_URL} = process.env;

module.exports = {
  cron: '00 * * * *',
  timeZone: 'Asia/Tokyo',
  accounts:[
    {
      ID: ID || 'mydns******',
      Password: PASSWORD || '***********',
      protocol: 'all',
      format: '{ID}\n{ADDR}',
      //all ipv6 ipv4
      notify: [
        {
          type: 'slack',
          url: SLACK_URL || 'https://hooks.slack.com/services/**************************************'
        }
      ]
    }
  ]
}