const mongodb = require('mongodb');
const {databaseURL} = require("../settings/settings");
const mongoClient = mongodb.MongoClient;

let db;

function mongoDbConnect(callback) {
    mongoClient.connect(databaseURL).then((client) => {
        console.log('connected');
        callback();
        db = client.db();
    }).catch(() => {
        console.log('error while conecting to database');
    })
}

function getDataBase() {
    return new Promise((resolve, reject) => {
        if (db) {
            console.log('db should exist');
            console.log(db);
            resolve(db);
        }
        reject(new Error('No database found!!!'));
    });
}

module.exports = {
    mongoDbConnect,
    getDataBase
};