const config = require("../../config.js");
const axios = require("axios");
const reqID = require("../../requestId.js");

async function call(method, params) {
    let c = config.getConfig();
    let query = { id: reqID(), "jsonrpc": "2.0", "method": method, "params": params };
    let res;
    let err;
    try {
        res = await axios.post(c.engineRPC, query);
    } catch (e) {
        err = e;
    }
    return new Promise((resolve, reject) => {
        if (err) {
            reject(new Error(err));
            return;
        }
        if (!res.data) {
            reject(new Error("Invalid Query"));
        }
        resolve(res.data.result);
    });
}

module.exports = call;