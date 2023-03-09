const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");

const collectionName = 'img_collections';

function deleteGallery(elemId) {
    return deleteElement(elemId, collectionName);
}

function saveGallery(elem) {
    return saveElement(elem, collectionName);
}

function addNewGallery(elem) {
    return addNewElement(elem, collectionName);
}

function getGallery(idElem) {
    return getElement(idElem, collectionName);
}

function getAllGalleries() {
    return getAllElements(collectionName);
}

module.exports = {
    getAllGalleries,
    getGallery
}