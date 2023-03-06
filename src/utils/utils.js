const {app_states} = require("./enums");

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
        delete obj.new_password;
    }
    return obj;
}

function findInArray(valueToFind, objectField, array) {
    return (array).find((elem) => {
        return (elem[objectField] === valueToFind);
    })
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
    getObject,
    emptyErrors,
    findInArray
}