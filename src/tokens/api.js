let axios = require("axios")
let config = require("../../config.js")

function getOrderBook(book, query, limit, offset, index) {
  let c = config.getConfig()
  let query = { id: 0, jsonrpc: "2.0", method: "find", params: { contract: "market", table: `${book}Book`, query: query, limit: limit, offset: offset, indexes: index } }
  let res
  try {
    res = await axios.post(c.engineRPC + "contracts", query)
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
function getTokensDetails(query, limit, offset, index) {
  let c = config.getConfig()
  let query = { id: 0, jsonrpc: "2.0", method: "find", params: { contract: "tokens", table: `tokens`, query: query, limit: limit, offset: offset, indexes: index } }
  let res
  try {
    res = await axios.post(c.engineRPC + "contracts", query)
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
  getTokensDetails
}