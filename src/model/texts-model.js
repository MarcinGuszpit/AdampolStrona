const data = require("./data");
const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function deleteText(textId) {
    return getDataBase().then((db) => {
        return db.collection('texts').deleteOne({_id: new ObjectId(textId)});
    });
}


function saveText(text) {
    return getDataBase().then((db) => {
        text._id = new ObjectId(text._id);
        return db.collection('texts').updateOne({_id: text._id}, {$set: text});
    });
}

function addNewText(text) {
    return getDataBase().then((db) => {
        delete text._id;
        return db.collection('texts').insertOne(text);
    });
}

function getText(idText) {
    return getDataBase().then((db) => {
        return db.collection('texts').find({_id: new ObjectId(idText)}).next();
    });
}

function getAllTexts() {
    return getDataBase().then((db) => {
        return db.collection('texts').find().toArray();
    });
}

module.exports = {
    saveText,
    getText,
    getAllTexts,
    addNewText,
    deleteText
}