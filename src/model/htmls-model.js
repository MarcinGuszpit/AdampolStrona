const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");

const collectionName = 'htmls';

function deleteHTML(elemId) {
    return deleteElement(elemId,collectionName);
}

function saveHTML(html) {
    return saveElement(html,collectionName);
}

function addNewHTML(html) {
    return addNewElement(html,collectionName);
}

function getHTML(idElem) {
    return getElement(idElem,collectionName);
}

function getAllHTMLs() {
    return getAllElements(collectionName);
}

module.exports = {
    saveHTML,
    getHTML,
    getAllHTMLs,
    addNewHTML,
    deleteHTML
}