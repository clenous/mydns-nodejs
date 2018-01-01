const axios = require('axios')

module.exports = async accounts=>{
  for(let account of accounts) {
    let message = await updateDns(account.ID, account.Password, account.protocol, account.format)
    await notify(message, account.notify)
  }
}

async function updateDns(id, password, protocol, format) {
  let message = ''
  if(protocol=='all' || protocol== 'ipv4')
    message += `${formatter(format, resultParser(await updateDnsV4(id, password)))}\n`
  if(protocol=='all' || protocol== 'ipv6')
    message += `${formatter(format, resultParser(await updateDnsV6(id, password)))}\n`
  return message
}

async function updateDnsV6(id, password) {
  return (await axios.get('http://ipv6.mydns.jp/login.html', {auth: {username: id, password}})).data
}

async function updateDnsV4(id, password) {
  return (await axios.get('http://ipv4.mydns.jp/login.html', {auth: {username: id, password}})).data
}

async function notify(message, options) {
  for(let option of options) {
    switch (option.type) {
      case 'slack':
        await sendSlack(option.url, message)
        break
    }
  }
}

async function sendSlack(url, text) {
  await axios.post(url, {text})
}

function resultParser(body) {
  const ID = body.match(/<DT>MASTERID :<\/DT><DD>(mydns\d+)<\/DD>/)[1]
  const daytime = body.match(/<DT>ACCESS DAYTIME:<\/DT><DD>(\d+\/\d+\/\d+ \d+:\d+)<\/DD>/)[1]
  const address = body.match(/<DT>REMOTE ADDRESS:<\/DT><DD>(.+)<\/DD>/)[1]
  return {ID, daytime, address}
}

function formatter(format, data) {
  return format
    .replace('{ID}', data.ID)
    .replace('{DAYTIME}', data.daytime)
    .replace('{ADDR}', data.address)
}