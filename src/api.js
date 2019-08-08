var SSC = require("sscjs")

const ssc = new SSC('https://api.steem-engine.com/rpc')

/**
 * Get user's balance for a token
 * @param {String} account The account to get balance from.
 * @param {String} symbol Symbol of token to get balance of.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function getUserTokenBalance(account, symbol, callback){
    ssc.findOne('tokens','balances', { account: account, symbol : symbol}, (err, result) => {
        if (err) {
            callback({success : false, message : "User hasn't interacted with the token or an error occured.", err : err})
        } else {
            console.log({success : true, err : null, data : result})
        }
    })
}


module.exports = {
    getUserTokenBalance : getUserTokenBalance
}