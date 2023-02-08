function extractErrors(errorsObj, headers) {
    let results = {};
    for (const key of Object.keys(headers)) {
        results[key] = '';
    }

    errorsObj.forEach(error => {
        const resultsKeys = Object.keys(results);
        const index = resultsKeys.findIndex(key => {
            return key === error.param;
        });

        if (index >= 0) {
            results[resultsKeys[index]] = error.msg;
        }
    });

    return results;

}

function getObjectFromRequestParams(req, removeAdditionalFields) {
    const obj = {...req.body};
    if (removeAdditionalFields) {
        delete obj._csrf;
        delete obj.state;
    }
    return obj;
}


module.exports = {
    extractErrors,
    getObjectFromRequestParams
}