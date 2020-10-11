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
  let nftQuery = { "id": 0, "jsonrpc": "2.0", "method": "find", "params": { "contract": "nft", "table": `${nftID}instances`, "query": query, "limit": limit, "offset": offset, "indexes": indexes } }
  let res
  let err
  try {
    res = await axios.post(c.engineRPC + "contracts", nftQuery)
  } catch (e) {
    err = e
  }
  return new Promise((resolve, reject) => {
    if (err) {
      reject(new Error(err))
      return
    }
    if (!res.data) {
      reject(new Error("Invalid Query"))
    }
    resolve(res.data.result)
  })
}

/**
 * 
 * @param {String} nftID ID of nft.
 * @param {JSON} query Query for hive-engine
 * @param {Array} indexes indexes
 */
async function getEntireNFTSellbook(nftID, query, indexes) {
  let orders = []
  let con = true
  let offset = 0
  while (con) {
    try {
      let newOrders = await getNFTSellBook(nftID, query, 1000, indexes, offset)
      orders = orders.concat(newOrders)
      offset = offset + 1000
      if (newOrders.length != 1000) {
        con = false
      }
    } catch (e) {
      throw new Error(e)
    }
  }
  return orders
}

/**
 * 
 * @param {String} nftID ID of nft.
 * @param {JSON} query Query for hive-engine
 * @param {Array} indexes indexes
 * @param {Integer} offset offset
 */
async function getNFTSellBook(nftID, query, limit, indexes, offset) {
  let c = config.getConfig()
  let nftQuery = { "id": 0, "jsonrpc": "2.0", "method": "find", "params": { "contract": "nftmarket", "table": `${nftID.toUpperCase()}sellBook`, "query": query, "limit": limit, "offset": offset, "indexes": indexes } }
  let res
  let err
  try {
    res = await axios.post(c.engineRPC + "contracts", nftQuery)
  } catch (e) {
    err = e
  }
  return new Promise((resolve, reject) => {
    if (err) {
      reject(new Error(err))
      return
    }
    if (!res.data) {
      reject(new Error("Invalid Query"))
    }
    resolve(res.data.result)
  })
}

module.exports = {
  getNFTDetails,
  getEntireNFTSellbook,
  getNFTSellBook
}
