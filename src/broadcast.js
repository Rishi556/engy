var steem = require("steem")
var SSC = require("sscjs")

const ssc = new SSC('https://api.steem-engine.com/rpc')

/**
 * Transfers tokens between steem-engine accounts.
 * @param {String} symbol The symbol of the token to transfer.
 * @param {String} to The reciever of the token.
 * @param {String} quantity The amount of the token to send.
 * @param {String} privateActiveKey The private active key of the sending account.
 * @param {String} from The sending account.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function transfer(symbol, to, quantity, memo, privateActiveKey, from, callback){
    symbol = symbol.toUpperCase()
    to = to.toLowerCase()
    quantity = quantity.toString()
    var sendJSON = {"contractName":"tokens","contractAction": "transfer" ,"contractPayload":{"symbol": symbol,"to": to,"quantity": quantity,"memo": memo}}
    steem.broadcast.customJson(privateActiveKey, [from], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
        if (result){
            validateTransaction(result.id, (trx) => {
                var logs = JSON.parse(trx.logs)
                if (logs.errors){
                    callback({success : false, err : logs.errors, message : logs.errors[0]})
                } else {
                    callback({success : true, err : null, message : "Successfully transferred.", data : trx})
                }
            })
        } else {
            callback({success : false, err : err, message : "Error broadcasting to Steem."})
        }
    })
}

function validateTransaction(id, callback){
    ssc.getTransactionInfo(id, (err, response) => {
        if (!response){
            setTimeout(() => {
                validateTransaction(id, callback)
            }, 1000 * 0.5)
            
        } else {
            return callback(response)
        }
    })
}

module.exports = {
    transfer : transfer
}