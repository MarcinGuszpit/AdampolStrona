const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function deleteHTML(elemId) {
    return getDataBase().then((db) => {
        return db.collection('htmls').deleteOne({_id: new ObjectId(elemId)});
    });
}


function saveHTML(html) {
    return getDataBase().then((db) => {
        html._id = new ObjectId(html._id);
        return db.collection('htmls').updateOne({_id: html._id}, {$set: html});
    });
}

function addNewHTML(html) {
    return getDataBase().then((db) => {
        delete html._id;
        return db.collection('htmls').insertOne(html);
    });
}

function getHTML(idElem) {
    return getDataBase().then((db) => {
        return db.collection('htmls').find({_id: new ObjectId(idElem)}).next();
    });
}

function getAllHTMLs() {
    return getDataBase().then((db) => {
        return db.collection('htmls').find().toArray();
    });
}

module.exports = {
    saveHTML,
    getHTML,
    getAllHTMLs,
    addNewHTML,
    deleteHTML
}