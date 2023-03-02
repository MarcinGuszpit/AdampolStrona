const data = require("../model/data");
const {app_states} = require("./enums");
const {getText} = require("../model/texts-model");

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

function getObject(appState, request, objFields, getObj) {
    let obj = createEmptyObject(objFields);

    if (appState === app_states.EDIT) {
        const {_id} = {...request.params};
        obj = getObj(_id);
    }
    return obj;
}

function getObjectFromRequestParams(req, removeAdditionalFields) {
    const obj = {...req.body};
    if (removeAdditionalFields) {
        delete obj._csrf;
        delete obj.state;
    }
    return obj;
}


function findPage(pageId) {
    return (data.pages).find((elem) => {
        return (elem.id === pageId);
    });
}

function emptyErrors(objFields) {
    const obj = {}
    objFields.forEach(elem => {
        if (!(elem === '_id')) {
            obj[elem] = '';
        }
    });
    return obj;
}


function createEmptyObject(objectFileds) {
    const obj = {};
    if (objectFileds && Array.isArray(objectFileds) && objectFileds.length > 0) {
        objectFileds.forEach(field => {
            obj[field] = '';
        });
    }
    return obj;
}


module.exports = {
    extractErrors,
    getObjectFromRequestParams,
    createEmptyObject,
    findPage,
    getObject,
    emptyErrors
}