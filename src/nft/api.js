let axios = require("axios")
let config = require("../../config.js")

/**
 * 
 * @param {String} nftID ID of nft.
 * @param {JSON} query Query for hive-engine.
 * @param {Integer} limit Limit. Max 1,000.
 * @param {Integer} offset Offset
 * @param {Array} indexes indexes
 * @returns {Promise}
 */
async function getNFTDetails(nftID, query, limit, offset, indexes) {
  nftID = nftID.toUpperCase()
  let c = config.getConfig()
  let nftQuery = {"id": 0, "jsonrpc": "2.0", "method": "find", "params": { "contract": "nft", "table": `${nftID}instances`, "query": query, "limit": limit, "offset": offset, "indexes": indexes } }
  let res
  let err
  try {
    res = await axios.post(c.engineRPC + "contracts", nftQuery)
  } catch (e) {
    err = e
  }
  return new Promise((resolve, reject) => {
    if (err) {
      reject({ error: err })
      return
    }
    if (!res.data){
      reject({ error : "Invalid Query"})
    }
    resolve(res.data.result)
  })
}

module.exports = {
  getNFTDetails
}