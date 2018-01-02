module.exports = (()=>{
  if(process.env.ID) {
    const {ID, PASSWORD, SLACK_URL} = process.env
    return {
      cron: '00 * * * *',
      timeZone: 'Asia/Tokyo',
      accounts:[
        {
          ID: ID || 'mydns******',
          Password: PASSWORD || '***********',
          protocol: 'all',
          format: '{ID}\n{ADDR}',
          //all ipv6 ipv4
          notify: SLACK_URL
            ?[{type: 'slack', url: SLACK_URL || 'https://hooks.slack.com/services/**************************************'}]
            :[]
        }
      ]
    }
  }else {
    const accounts = []
    for(let i=1;true;i++) { //eslint-disable-line
      if(!process.env[`ID_${i}`])break
      accounts.push({
        ID: process.env[`ID_${i}`],
        Password: process.env[`PASSWORD_${i}`],
        protocol: 'all',
        format: '{ID}\n{ADDR}',
        //all ipv6 ipv4
        notify: process.env[`SLACK_URL_${i}`]
          ?[{type: 'slack', url: process.env[`SLACK_URL_${i}`]}]
          :[]
      })
    }
    return {
      cron: '00 * * * *',
      timeZone: 'Asia/Tokyo',
      accounts
    }
  }
})()