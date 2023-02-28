const {app_states} = require("../utils/enums");
const {createEmptyObject, extractErrors, findPage, getObjectFromRequestParams, getObject} = require("../utils/utils");
const {getAllTexts, getText, saveText, addNewText} = require("../model/texts-model");
const {validationResult} = require("express-validator");
const data = require('../model/data');

const objFields = ['_id', 'description', 'text'];
const pagesAdditionalText = {
    LIST: {
        subTitle: 'Zawartość tekstowa',
        description: 'Lista elementów tekstowych',
    },
    NEW: {
        subTitle: 'Dodaj nowy tekst',
        description: 'Dodawanie nowego elementu tekstowego',
    },
    EDIT: {
        subTitle: 'Edytuj istniejący tekst',
        description: 'Edycja elementu tekstowego',
    }
}

const headers = {
    description: 'Opis',
    text: 'Tekst'
};

const page = findPage('texts');

function renderAllTexts(req, res, next) {
    getAllTexts().then((results) => {
        res.render('texts/texts-settings.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: data.user,
            txtHeaders: headers,
            showButtons: true,
            txtData: results
        });
    }).catch(() => {
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Nie udało się pobrać listy elementów!',
            info: 'Wystąpił błąd dostępu do bazy danych!'
        });
    });

}

function renderAddNewText(req, res, next) {
    render(req, res, next, app_states.NEW, pagesAdditionalText.NEW, addNewText);
}

function renderEditText(req, res, next) {
    render(req, res, next, app_states.EDIT, pagesAdditionalText.EDIT, saveText);
}

function render(req, res, next, appState, titles, saveMethod) {

    const {_id} = {...req.params};
    getText(_id).then((result) => {
        let obj = result;
        if (appState === app_states.NEW) {
            obj = createEmptyObject(objFields);
        }
        if (obj) {
            if (req.method === 'POST') {
                const valErrors = validationResult(req).array();
                if (valErrors.length === 0) {
                    const objToSave = getObjectFromRequestParams(req, true);
                    saveMethod(objToSave).then(() => {
                        res.redirect('/texts/list');
                    }).catch(() => {
                        res.render('error-custom-msg.ejs', {
                            error: null,
                            title: 'Nie udało się zapisać elementu!',
                            info: 'Wystąpił błąd dostępu do bazy danych!'
                        });
                    });

                } else {
                    const errors = extractErrors(valErrors, headers);
                    res.render('texts/text-edit-new.ejs', {
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
            if (req.method === 'GET') {
                res.render('texts/text-edit-new.ejs', {
                    page,
                    data: obj,
                    errors: getEmptyErrors(objFields),
                    subTitle: titles.subTitle,
                    description: titles.description,
                    pages: data.pages,
                    user: data.user,
                });
            }

        } else {
            res.render('error-custom-msg.ejs', {
                error: null,
                title: 'Wystąpił błąd!',
                info: 'Nie udało się utworzyć elementu do edycji!'
            });
        }
    });
}

function getEmptyErrors(objFields) {
    const obj = {}
    objFields.forEach(elem => {
        if (!(elem === '_id')) {
            obj[elem] = '';
        }
    });
    return obj;
}

module.exports = {
    renderAllTexts,
    renderAddNewText,
    renderEditText
}