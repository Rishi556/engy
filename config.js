let config = {}

config.engineRPC = "https://api.hive-engine.com/rpc/"
config.engineID = "ssc-mainnet-hive"
config.validate = true
config.hive = require("@hiveio/hive-js")

/**
 * 
 * @param {String} property Proerty to change value of
 * @param {String} value New value
 */
function update(property, value) {
  if (config[property]) {
    config[property] = value
  }
}

/**
 * @return {Object} Current config
 */
function getConfig() {
  return config
}

module.exports = {
  update,
  getConfig
}