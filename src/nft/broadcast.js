let config = require("../../config.js")
let hive = config.getConfig().hive
let axios = require("axios")

/**
 * 
 * @param {String} wif Private Active Key for account.
 * @param {String} sender Username of sender.
 * @param {String} to Username of reciever.
 * @param {String} symbol Symbol of token to send.
 * @param {Array} cardIDs Array of card ids to send.
 * @returns {Promise} 
 */
function transfer(wif, sender, to, symbol, cardIDs) {
  sender = sender.toLowerCase()
  to = to.toLowerCase()
  symbol = symbol.toUpperCase()
  return new Promise((resolve, reject) => {
    if (!Array.isArray(cardIDs)) {
      reject("cardIDs must be an array.")
      return
    }
    let c = config.getConfig()
    let sendJSON = { "contractName": "nft", "contractAction": "transfer", "contractPayload": { "to": to, "nfts": [{ "symbol": symbol, "ids": cardIDs }] } }
    hive.broadcast.customJson(wif, null, [sender], c.engineID, sendJSON, (err, result) => {
      if (err) {
        reject({hive : err})
        return
      }
      if (!c.validate){
        resolve({hive : result, engyMessage : "Result not validated."})
        return
      }
      //Verify then resolve
    })
  })
}




function verify() {

}

module.exports = {
  transfer
}