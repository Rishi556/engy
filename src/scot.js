var SSC = require("sscjs")
var request = require("request")

const ssc = new SSC('https://api.steem-engine.com/rpc')

/**
 * Get an account's claimbale SCOT tokens.
 * @param {String} account Account name to get claimable token data of.
 * @param {Object} callback Callback. Check if success is true to see if it worked.
 */
function getAllAccountClaimableTokenBalances(account, callback){
    request(`https://scot-api.steem-engine.com/@${account}`,null, (err, response, body) => {
        if (err){
            if (callback){
                callback({success : false, message: "Error retriving data from scot-api.", err : err})
            }
            return 
        }
        body = JSON.parse(body)
        var claimable = []
        for (i in body){
            if (body[i].pending_token != 0){
                //TODO: add amount that's pending. Need to use precesion from S-E.
                claimable.push({token : i})
            }
        }
        if (callback){
            callback({success : true, message: "Got data.", data : claimable})
        }
    })
}

module.exports = {
    getAllAccountClaimableTokenBalances : getAllAccountClaimableTokenBalances
}