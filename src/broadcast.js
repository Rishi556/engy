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
                    if (callback){
                        callback({success : false, err : logs.errors, message : logs.errors[0]})
                    }
                } else {
                    if (callback){
                        callback({success : true, err : null, message : "Successfully transferred.", data : trx})
                    }
                }
            })
        } else {
            if (callback){
                callback({success : false, err : err, message : "Error broadcasting to Steem."})
            }
        }
    })
}

/**
 * Claims an account's Scot token reward.
 * @param {String} symbol The symbol of the token to claim.
 * @param {String} privatePostingKey The private posting key of the claiming account.
 * @param {String} account The claiming account.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function claimScotToken(symbol,privatePostingKey, account, callback){
    symbol = symbol.toUpperCase()
    var sendJSON = {"symbol": symbol}
    steem.broadcast.customJson(privatePostingKey, null, [account], "scot_claim_token", JSON.stringify(sendJSON), function(err, result) {
        if (!result){
            if (callback) {
                callback({success : false, err : err, message : "Error broadcasting to Steem."})
            }
        } else {
            if (callback){
                callback({success : true, err : null, message : "Successfully claimed.", data : result})
            }
        }
    })
}

/**
 * Stake tokens.
 * @param {String} symbol The symbol of the token to stake.
 * @param {String} to The reciever of the staked tokens.
 * @param {String} quantity The amount of the token to stake.
 * @param {String} privateActiveKey The private active key of the staking account.
 * @param {String} from The staking account.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function stakeToken(symbol, to, quantity, privateActiveKey, from, callback){
    symbol = symbol.toUpperCase()
    to = to.toLowerCase()
    quantity = quantity.toString()
    var sendJSON = {"contractName": "tokens", "contractAction": "stake", "contractPayload":{"to": to, "symbol": symbol, "quantity": quantity}}
    steem.broadcast.customJson(privateActiveKey, [from], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
        if (result){
            validateTransaction(result.id, (trx) => {
                var logs = JSON.parse(trx.logs)
                if (logs.errors){
                    if (callback){
                        callback({success : false, err : logs.errors, message : logs.errors[0]})
                    }
                } else {
                    if (callback){
                        callback({success : true, err : null, message : "Successfully staked.", data : trx})
                    }
                }
            })
        } else {
            if (callback){
                callback({success : false, err : err, message : "Error broadcasting to Steem."})
            }
        }
    })
}

/**
 * Delegate tokens. Please note to delegate amount to increase by, not total to delegate.
 * @param {String} symbol The symbol of the token to delegate.
 * @param {String} to The reciever of the delegated tokens.
 * @param {String} quantity The amount of the token to delegate.
 * @param {String} privateActiveKey The private active key of the delegating account.
 * @param {String} from The delegating account.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function delegateToken(symbol, to, quantity, privateActiveKey, from, callback){
    symbol = symbol.toUpperCase()
    to = to.toLowerCase()
    quantity = quantity.toString()
    var sendJSON = {"contractName": "tokens", "contractAction": "delegate", "contractPayload":{"to": to, "symbol": symbol, "quantity": quantity}}
    steem.broadcast.customJson(privateActiveKey, [from], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
        if (result){
            validateTransaction(result.id, (trx) => {
                var logs = JSON.parse(trx.logs)
                if (logs.errors){
                    if (callback){
                        callback({success : false, err : logs.errors, message : logs.errors[0]})
                    }
                } else {
                    if (callback){
                        callback({success : true, err : null, message : "Successfully delegated.", data : trx})
                    }
                }
            })
        } else {
            if (callback){
                callback({success : false, err : err, message : "Error broadcasting to Steem."})
            }
        }
    })
}

/**
 * Undelegate tokens. Please note to undelegate amount to undelegate by, not total to delegate.
 * @param {String} symbol The symbol of the token to undelegate.
 * @param {String} undelegateFrom The user to take delegation from.
 * @param {String} quantity The amount of the token to undelegate.
 * @param {String} privateActiveKey The private active key of the undelegating account.
 * @param {String} undelegator The undelegating account.
 * @param {Object} callback Callback. Check if success is true to see if sending worked.
 */
function undelegateToken(symbol, undelegateFrom, quantity, privateActiveKey, undelegator, callback){
    symbol = symbol.toUpperCase()
    undelegateFrom = undelegateFrom.toLowerCase()
    quantity = quantity.toString()
    var sendJSON = {"contractName": "tokens", "contractAction": "undelegate", "contractPayload":{"from": undelegateFrom, "symbol": symbol, "quantity": quantity}}
    steem.broadcast.customJson(privateActiveKey, [undelegator], null, "ssc-mainnet1", JSON.stringify(sendJSON), function(err, result) {
        if (result){
            validateTransaction(result.id, (trx) => {
                var logs = JSON.parse(trx.logs)
                if (logs.errors){
                    if (callback){
                        callback({success : false, err : logs.errors, message : logs.errors[0]})
                    }
                } else {
                    if (callback){
                        callback({success : true, err : null, message : "Successfully undelegated.", data : trx})
                    }
                }
            })
        } else {
            if (callback){
                callback({success : false, err : err, message : "Error broadcasting to Steem."})
            }
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
    transfer : transfer,
    claimScotToken : claimScotToken,
    stakeToken : stakeToken,
    delegateToken : delegateToken,
    undelegateToken : undelegateToken
}