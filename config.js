let config = {};

config.engineRPC = "https://api.hive-engine.com/rpc/";
config.alternateRPC = [];
config.engineID = "ssc-mainnet-hive";
config.validate = true;
config.hive = require("@hiveio/hive-js");

/**
 * Updates a config with a new value
 * @param {String} property Proerty to change value of
 * @param {String} value New value
 */
function update(property, value) {
    if (config[property]) {
        config[property] = value;
    }
}

/**
 * Return's config
 * @return {Object} Current config
 */
function getConfig() {
    return config;
}

module.exports = {
    update,
    getConfig
};