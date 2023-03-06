const {getAdminData, saveAdminData, getBasicAdminData} = require("../model/admin-model");
const {getAllTexts} = require("../model/texts-model");
const data = require("../model/data");
const {findPage, emptyErrors, createEmptyObject, getObjectFromRequestParams, extractErrors} = require("../utils/utils");
const {validationResult} = require("express-validator");

const objFields = ['_id', 'name', 'email', 'password', 'new_password'];

const pagesAdditionalText = {
    LIST: {
        subTitle: 'Dane administratora',
        description: 'Dane logowania dla administratora strony',
    },
    EDIT: {
        subTitle: 'Edytuj dane administratora',
        description: 'Edycja danych logowania',
    }
}

const page = findPage('admin');

function showAdminSettings(req, res, next) {
    getBasicAdminData().then((results) => {
        res.render('admin-settings/admin-list.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: data.user,
            data: results
        });
    }).catch(() => {
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Nie udało się pobrać listy elementów!',
            info: 'Wystąpił błąd dostępu do bazy danych!'
        });
    });
}

function editAdminSettings(req, res, next) {
    render(req, res, next, pagesAdditionalText.EDIT, saveAdminData);
}

function render(req, res, next, titles, saveMethod) {
    let obj = createEmptyObject(objFields);
    getBasicAdminData().then((result) => {
        obj = {...obj, ...result};
        if (req.method === 'GET') {
            res.render('admin-settings/admin-edit.ejs', {
                page,
                data: obj,
                errors: emptyErrors(objFields),
                subTitle: titles.subTitle,
                description: titles.description,
                pages: data.pages,
                user: data.user,
            });
        }
        if (req.method === 'POST') {
            const valErrors = validationResult(req).array();
            if (valErrors.length === 0) {
                const objToSave = getObjectFromRequestParams(req, true);
                saveMethod(objToSave).then(() => {
                    res.redirect('/logout');
                }).catch(() => {
                    res.render('error-custom-msg.ejs', {
                        error: null,
                        title: 'Nie udało się zapisać elementu!',
                        info: 'Wystąpił błąd dostępu do bazy danych!'
                    });
                });
            } else {
                const errors = extractErrors(valErrors, emptyErrors(objFields));
                res.render('admin-settings/admin-edit.ejs', {
                    page,
                    data: getObjectFromRequestParams(req, true),
                    errors,
                    subTitle: titles.subTitle,
                    description: titles.description,
                    pages: data.pages,
                    user: data.user,
                });
            }
        }
    });
}

module.exports = {
    showAdminSettings,
    editAdminSettings
}