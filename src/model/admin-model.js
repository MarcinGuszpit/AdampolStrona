const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function saveAdminData(adminData) {
    return getDataBase().then((db) => {
        adminData._id = new ObjectId(adminData._id);
        return db.collection('admin-settings').updateOne({_id: text._id}, {$set: adminData});
    });
}

function getAdminData() {
    return getDataBase().then((db) => {
        return db.collection('admin-settings').findOne();
    });
}

module.exports = {
    saveAdminData,
    getAdminData
}