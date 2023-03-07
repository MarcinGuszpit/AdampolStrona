const bcrypt = require('bcryptjs');
const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function saveAdminData(adminData) {
    return bcrypt.hash(adminData.password, 12).then((result) => {
        adminData = {...adminData, _id: new ObjectId(adminData._id), password: result};
        return getDataBase().then((db) => {
            return db.collection('admin-settings').updateOne({_id: adminData._id}, {$set: adminData});
        });
    });
}

function getAdminData() {
    return getDataBase().then((db) => {
        return db.collection('admin-settings').findOne();
    });
}

function getBasicAdminData() {
    return getDataBase().then((db) => {
        return db.collection('admin-settings').findOne().then((adminData) => {
            delete adminData.password;
            return adminData;
        });
    });
}

function checkAdmin(admin) {
    return getDataBase().then((db) => {
        return db.collection('admin-settings').findOne().then((adminFromDb) => {
            if (admin.email === adminFromDb.email) {
                return bcrypt.compare(adminFromDb.password, admin.password);
            }
            return new Promise((resolve, reject) => {
                reject(new Error('Nieprawidłowe dane logowania'));
            });
        });
    });
}


module.exports = {
    saveAdminData,
    getAdminData,
    getBasicAdminData,
    checkAdmin,
}