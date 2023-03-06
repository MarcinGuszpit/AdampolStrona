const {getDataBase} = require('./../utils/database')
const {ObjectId} = require("mongodb");

function saveAdminData(adminData) {
    return getDataBase().then((db) => {
        adminData._id = new ObjectId(adminData._id);
        return db.collection('admin-settings').updateOne({_id: adminData._id}, {$set: adminData});
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
            return new Promise((resolve, reject) => {
                if (admin.email === adminFromDb.email && admin.password === adminFromDb.password) {
                    resolve({
                        name: adminFromDb.name,
                        email: adminFromDb.email,
                        loggedIn: true,
                    });
                }
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