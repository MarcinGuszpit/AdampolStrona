const {deleteElement, saveElement, addNewElement, getElement, getAllElements} = require("./basic-crud-operations");
const {getText} = require("./texts-model");
const {getAllGalleries, getGallery} = require("./galleries-model");
const {getHTML} = require("./htmls-model");

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
        console.log(obj);
        return true;
    }).catch((error => {
        console.log(error);
    }))
}

function addNewPageSection(elem) {
    return addNewElement(elem, collectionName);
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