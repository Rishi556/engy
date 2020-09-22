let axios = require("axios")
let config = require("../../config.js")

async function getOrderBook(book, query, limit, offset, indexes) {
  let c = config.getConfig()
  let tokensQuery = { id: 0, jsonrpc: "2.0", method: "find", params: { contract: "market", table: `${book}Book`, query: query, limit: limit, offset: offset, indexes: indexes } }
  let res
  let err
  try {
    res = await axios.post(c.engineRPC + "contracts", tokensQuery)
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
 * @param {JSON} query Query for hive-engine
 * @param {Integer} limit limit
 * @param {Integer} offset offset
 * @param {Array} indexes indexes
 */
async function getTokensDetails(query, limit, offset, indexes) {
  let c = config.getConfig()
  let tokensQuery = { id: 0, jsonrpc: "2.0", method: "find", params: { contract: "tokens", table: `tokens`, query: query, limit: limit, offset: offset, indexes: indexes } }
  let res
  let err
  try {
    res = await axios.post(c.engineRPC + "contracts", tokensQuery)
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
* @param {JSON} query Query for hive-engine
* @param {Integer} limit limit
* @param {Integer} offset offset
* @param {Array} indexes indexes
*/
async function getMarketMetrics(query, limit, offset, indexes) {
 let c = config.getConfig()
 let tokensQuery = { id: 0, jsonrpc: "2.0", method: "find", params: { contract: "market", table: `metrics`, query: query, limit: limit, offset: offset, indexes: indexes } }
 let res
 let err
 try {
   res = await axios.post(c.engineRPC + "contracts", tokensQuery)
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
  getTokensDetails,
  getMarketMetrics
}