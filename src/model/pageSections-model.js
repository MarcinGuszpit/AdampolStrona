const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");
const {getText} = require("./texts-model");
const {getAllGalleries, getGallery} = require("./galleries-model");
const {getHTML} = require("./htmls-model");
const {findInArray} = require("../utils/utils");
const data = require("./data");

function getObject(elem) {
    let {content_type, elem_id} = {...elem};
    return new Promise((resolve, reject) => {
        switch (content_type) {
            case 'text': {
                resolve(getText(elem_id));
                break;
            }
            case 'gallery': {
                resolve(getGallery(elem_id));
                break;
            }
            case 'html-fragment': {
                resolve(getHTML(elem_id));
                break;
            }
            default: {
                reject('Nie udało się ');
            }
        }
    });
}


const collectionName = 'page_sections';

function deletePageSection(elemId) {
    return deleteElement(elemId, collectionName);
}

function savePageSection(elem) {
    return getObject(elem).then((obj) => {
        elem.object = obj;
        elem.content_object = findInArray(elem.content_type, 'id', data.contentTypes);
        return saveElement(elem, collectionName);
    });
}

function addNewPageSection(elem) {
    return getObject(elem).then((obj) => {
        elem.object = obj;
        elem.content_object = findInArray(elem.content_type, 'id', data.contentTypes);
        return addNewElement(elem, collectionName);
    });
}

function getPageSection(idElem) {
    return getElement(idElem, collectionName);
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