const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");

const collectionName = 'page_sections';

function deletePageSection(elemId) {
    return deleteElement(elemId,collectionName);
}

function savePageSection(html) {
    return saveElement(html,collectionName);
}

function addNewPageSection(html) {
    return addNewElement(html,collectionName);
}

function getPageSection(idElem) {
    return getElement(idElem,collectionName);
}

function getAllPageSections() {
    return getAllElements(collectionName);
}

module.exports = {
    savePageSection,
    getPageSection,
    getAllPageSections,
    addNewPageSection,
    deletePageSection
}