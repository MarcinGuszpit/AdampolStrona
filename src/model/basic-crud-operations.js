const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function deleteElement(elemId, collectionName) {
    return getDataBase().then((db) => {
        return db.collection(collectionName).deleteOne({_id: new ObjectId(elemId)});
    });
}


function saveElement(element, collectionName) {
    return getDataBase().then((db) => {
        element._id = new ObjectId(element._id);
        return db.collection(collectionName).updateOne({_id: element._id}, {$set: element});
    });
}

function addNewElement(element, collectionName) {
    return getDataBase().then((db) => {
        delete element._id;
        return db.collection(collectionName).insertOne(element);
    });
}

function getElement(idElement, collectionName) {
    return getDataBase().then((db) => {
        return db.collection(collectionName).find({_id: new ObjectId(idElement)}).next();
    });
}

function getAllElements(collectionName) {
    return getDataBase().then((db) => {
        return db.collection(collectionName).find().toArray();
    });
}

module.exports = {
    deleteElement,
    addNewElement,
    getAllElements,
    getElement,
    saveElement
}