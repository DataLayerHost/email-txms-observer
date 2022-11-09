import axios from "axios"
import txms from "txms.js"

export default defineComponent({
  async run({ steps, $ }) {
    const debug = false
    const streamer = {
      testnet: '', // Devin Blockbook
      mainnet: '' // Mainnet Blockbook
    }
    const network = steps.trigger.event.headers.subject
    const body = steps.trigger.event.body.text
    const parts = body.split(/\u000a/u)
    parts.forEach(function (msg, index) {
      let rawmsg = msg.trim()
      const hextest = /^(0[xX])?[0-9a-fA-F]+$/
      let hextx = ''
      if (hextest.test(rawmsg)) {
        if (rawmsg.toLowerCase().startsWith('0x')) {
          hextx = rawmsg
        } else {
          hextx = '0x' + rawmsg
        }
        if(debug) console.log('Info', 'HEX message: ' + hextx)
      } else if(typeof rawmsg === 'string' && rawmsg.length !== 0) {
        hextx = txms.decode(rawmsg)
        if(debug) console.log('Info', 'TXMS message: ' + hextx)
      } else {
        let error = 'Err(2): Empty message part'
        let perror = { "id": null, "message": error, "sent": false, "error": "Empty message part", "errno": 2, "date": (new Date().toISOString()) }
        if(debug) console.error('Err(2)', perror)
        return perror
      }

      let net = streamer.mainnet
      switch (network) {
        case 'mainnet':
        case 'main':
        case 1:
          net = streamer.mainnet
          break
        case 'testnet':
        case 'test':
        case 'devin':
        case 3:
          net = streamer.testnet
          break
        default:
          net = streamer.mainnet
          break
      }
      const provider = net + '/api/v2/sendtx/'

      axios.post(provider, hextx, {
        headers: {
          'Content-Type': 'text/plain',
          'User-Agent': 'txms-mail'
        }
      })
      .then(function (response) {
        if(response.result) {
          let ok = 'OK: <'+hextx.substring(2, 5)+hextx.slice(-3)+'> '+response.result
          let oks = { "message": ok, "sent": true, "hash": response.result, "date": (new Date().toISOString()) }
          if(debug) console.log('OK', oks)
          return oks
        } else {
          let ok = 'OK: <'+hextx.substring(2, 5)+hextx.slice(-3)+'>'
          let oks = { "message": ok, "sent": true, "date": (new Date().toISOString()) }
          if(debug) console.log('OK', oks)
          return oks
        }
      })
      .catch(function (err) {
        let error = 'Err(3): <'+hextx.substring(2, 5)+hextx.slice(-3)+'>'
        let errors = { "message": error, "sent": false, "error": err.message, "errno": 3, "date": (new Date().toISOString()) }
        if(debug) console.error('Err(4)', errors)
        return errors
      })
    })
  },
})
