const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");

const collectionName = 'texts';

function deleteText(textId) {
    return deleteElement(textId, collectionName);
}

function saveText(text) {
    return saveElement(text,collectionName);
}

function addNewText(text) {
    return addNewElement(text,collectionName);
}

function getText(idText) {
    return getElement(idText,collectionName);
}

function getAllTexts() {
    return getAllElements(collectionName);
}

module.exports = {
    saveText,
    getText,
    getAllTexts,
    addNewText,
    deleteText
}