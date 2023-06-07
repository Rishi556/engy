let requestId = 1;

function getReqId() {
    requestId = requestId + 1 > Number.MAX_SAFE_INTEGER ? 1 : requestId + 1;
    return requestId;
}

module.exports = getReqId;