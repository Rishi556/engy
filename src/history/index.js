let axios = require("axios");
let config = require("../../config.js");

async function get(endpoint, params) {
    let c = config.getConfig();
    let paramsString = "";
    for (let key in params) {
        if (paramsString != "") {
            paramsString += "&";
        }
        paramsString += key + "=" + encodeURIComponent(params[key]);
    }
    let res;
    let err;
    try {
        res = await axios.get(c.historyNode + endpoint + "?" + paramsString);
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
        resolve(res.data);
    });
}

module.exports = {
    get
};