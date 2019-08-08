var SSC = require("sscjs")

const ssc = new SSC('https://api.steem-engine.com/rpc')

/**
 * Get user's balance for a token.
 * @param {String} account The account to get balance from.
 * @param {String} symbol Symbol of token to get balance of.
 * @param {Object} callback Callback. Check if success is true to see if it worked.
 */
function getUserTokenBalance(account, symbol, callback){
    ssc.findOne('tokens','balances', { account: account, symbol : symbol}, (err, result) => {
        if (err) {
            if (callback){
               callback({success : false, message : "User hasn't interacted with the token or an error occured.", err : err}) 
            }
        } else {
            if (callback){
                callback({success : true, err : null, data : result})
            }
        }
    })
}

/**
 * Get all of user's balances.
 * @param {String} account The account to get balance from.
 * @param {Object} callback Callback. Check if success is true to see if it worked.
 */
function getUserAllTokenBalances(account, callback){
    makeUserWholeTokenBalance(account, 0, [], 0, (res) => {
        if (callback){
            callback(res)
        }
    })
}

function makeUserWholeTokenBalance(account, start, balance, errorCount, callback){
    ssc.find('tokens','balances', { account: account}, 1000, start, [], (err, result) => {
        if (err) {
            if (errorCount > 3){
                return callback({success : false, err : err})
            }
            setTimeout(() => {
                errorCount = errorCount + 1
                makeUserWholeTokenBalance(account, start, balance, callback)
            }, 1000 * 0.5)
        } else {
            for (i in result){
                balance.push(result[i])
            }
            if (result.length == 1000){
                makeUserWholeTokenBalance(account, start + 1000, balance, callback)
            } else {
                callback({success : true, data : balance})
            }
        }
    })
}

module.exports = {
    getUserTokenBalance : getUserTokenBalance,
    getUserAllTokenBalances : getUserAllTokenBalances
}