const data = require("../model/data");
const {
    getObjectFromRequestParams,
    extractErrors,
    createEmptyObject,
    emptyErrors,
    findInArray
} = require("../utils/utils");
const {addNewHTML, saveHTML, getHTML, getAllHTMLs} = require('../model/htmls-model');
const {app_states} = require("../utils/enums");
const {validationResult} = require("express-validator");

const objFields = ['_id', 'description', 'html'];

const pagesAdditionalText = {
    LIST: {
        subTitle: 'Fragmenty HTML',
        description: 'Lista elementów HTML',
    },
    NEW: {
        subTitle: 'Dodaj nowy HTML',
        description: 'Dodawanie nowego elementu HTML',
    },
    EDIT: {
        subTitle: 'Edytuj istniejący HTML',
        description: 'Edycja elementu HTML',
    }
}


const page = findInArray('html', 'id', data.pages);

function renderAllHTML(req, res, next) {
    getAllHTMLs().then((results) => {
        res.render('html/html-list.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: req.session.email,
            data: results
        });
    }).catch(() => {
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Nie udało się pobrać listy elementów!',
            info: 'Wystąpił błąd dostępu do bazy danych!',
            link: '/html/list',
            linkMessage: 'Powrót do podstrony - HTML'
        });
    });
}

function renderAddNewHTML(req, res, next) {
    render(req, res, next, app_states.NEW, pagesAdditionalText.NEW, addNewHTML);
}

function renderEditHTML(req, res, next) {
    render(req, res, next, app_states.EDIT, pagesAdditionalText.EDIT, saveHTML);
}

function render(req, res, next, appState, titles, saveMethod) {

    const {_id} = {...req.params};
    getHTML(_id).then((result) => {
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
                        res.redirect('/html/list');
                    }).catch(() => {
                        res.render('error-custom-msg.ejs', {
                            error: null,
                            title: 'Nie udało się zapisać elementu!',
                            info: 'Wystąpił błąd dostępu do bazy danych!',
                            link: '/html/list',
                            linkMessage: 'Powrót do podstrony - HTML'
                        });
                    });

                } else {
                    const errors = extractErrors(valErrors, emptyErrors(objFields));
                    res.render('html/html-edit-new.ejs', {
                        page,
                        data: getObjectFromRequestParams(req, true),
                        errors,
                        subTitle: titles.subTitle,
                        description: titles.description,
                        pages: data.pages,
                        user: req.session.email,
                    });
                }
            }
            if (req.method === 'GET') {
                res.render('html/html-edit-new.ejs', {
                    page,
                    data: obj,
                    errors: emptyErrors(objFields),
                    subTitle: titles.subTitle,
                    description: titles.description,
                    pages: data.pages,
                    user: req.session.email,
                });
            }

        } else {
            res.render('error-custom-msg.ejs', {
                error: null,
                title: 'Wystąpił błąd!',
                info: 'Nie udało się utworzyć elementu do edycji!',
                link: '/html/list',
                linkMessage: 'Powrót do podstrony - HTML'
            });
        }
    });
}

module.exports = {
    renderAllHTML,
    renderAddNewHTML,
    renderEditHTML
};

