const {
    emptyErrors,
    createEmptyObject,
    findInArray,
    extractErrors
} = require("../utils/utils");
const data = require("../model/data");
const {getAllPageSections, getPageSection, savePageSection, addNewPageSection} = require("../model/pageSections-model");
const {app_states} = require("../utils/enums");
const {getAllTexts} = require("../model/texts-model");
const {getAllHTMLs} = require("../model/htmls-model");
const {getAllGalleries} = require("../model/galleries-model");
const {validationResult} = require("express-validator");

const pagesAdditionalText = {
    LIST: {
        subTitle: 'Sekcje strony głównej', description: 'Lista sekcji strony głównej',
    }, NEW: {
        subTitle: 'Dodaj nowy HTML', description: 'Dodawanie nowego elementu HTML',
    }, EDIT: {
        subTitle: 'Edytuj istniejący HTML', description: 'Edycja elementu HTML',
    }
}

const page = findInArray('pageSections', 'id', data.pages);
const objFields = ['_id', 'title', 'nav_title', 'content_type', 'element_id', 'object', 'content_object'];

function getElementIdFromRequest(req) {
    const obj = {...req.body};
    switch (obj.content_type) {
        case 'text': {
            return obj.txt_id;
        }
        case 'gallery': {
            return obj.gallery_id;
        }
        case 'html-fragment': {
            return obj.html_id;
        }
    }
}

function getObjectDataFromRequest(req) {
    let obj = {
        _id: req.body._id,
        title: req.body.title,
        nav_title: req.body.nav_title,
        content_type: req.body.content_type,
        elem_id: getElementIdFromRequest(req)
    };
    return obj;
}

function renderError(res, title, info) {
    res.render('error-custom-msg.ejs', {
        error: null,
        title,
        info,
        link: '/page-sections/list',
        linkMessage: 'Powrót do podstrony - sekcje strony głównej'
    });
}

function renderListAllPageSections(req, res, next) {
    getAllPageSections().then((results) => {
        res.render('page-sections/page-sections-list.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: req.session.email,
            data: results
        });
    }).catch(() => {
        renderError(res, 'Nie udało się pobrać elementów!', 'Wystąpił błąd dostępu do bazy danych!');
    });
}

function renderAddNewPageSection(req, res, next) {
    render(req, res, next, app_states.NEW, pagesAdditionalText.NEW, addNewPageSection);
}

function renderEditPageSection(req, res, next) {
    render(req, res, next, app_states.EDIT, pagesAdditionalText.EDIT, savePageSection);
}

function render(req, res, next, appState, titles, saveMethod) {
    const {_id} = {...req.params};
    Promise.all([getAllTexts(), getAllHTMLs(), getAllGalleries(), getPageSection(_id)]).then((results) => {
        let [texts, htmls, galleries, obj] = [...results];
        if (req.method === 'GET') {
            if (appState === app_states.NEW) {
                obj = createEmptyObject(objFields);
            }
            res.render('page-sections/page-section-edit-new.ejs', {
                page,
                data: obj,
                errors: emptyErrors(objFields),
                subTitle: titles.subTitle,
                contentTypes: data.contentTypes,
                texts,
                htmls,
                galleries,
                description: titles.description,
                pages: data.pages,
                user: req.session.email,
            })
        }
        if (req.method === 'POST') {
            let obj = getObjectDataFromRequest(req);
            const valErrors = validationResult(req).array();
            if (valErrors.length === 0) {
                saveMethod(obj).then(() => {
                    res.redirect('/page-sections/list');
                }).catch(() => {
                    renderError(res, 'Nie udało się zapisać elementu!', 'Wystąpił błąd dostępu do bazy danych!');
                });

            } else {
                const errors = extractErrors(valErrors, createEmptyObject(objFields));
                res.render('page-sections/page-section-edit-new.ejs', {
                    page,
                    data: obj,
                    errors,
                    subTitle: titles.subTitle,
                    contentTypes: data.contentTypes,
                    texts,
                    htmls,
                    galleries,
                    description: titles.description,
                    pages: data.pages,
                    user: req.session.email,
                });
            }
        }
    }).catch(() => {
        renderError(res, 'Nie udało się pobrać niektórych elementów!', 'Wystąpił błąd dostępu do bazy danych!');
    });
}


module.exports = {
    renderListAllPageSections, renderAddNewPageSection, renderEditPageSection
}