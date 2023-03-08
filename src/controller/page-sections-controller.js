const {findPage, emptyErrors, createEmptyObject, getObjectFromRequestParams, findInArray, extractErrors} = require("../utils/utils");
const data = require("../model/data");
const {getAllPageSections, getPageSection} = require("../model/pageSections-model");
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
const objFields = ['_id', 'title', 'nav_title', 'content_type' , 'element_id', 'element'];

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
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Nie udało się pobrać listy elementów!',
            info: 'Wystąpił błąd dostępu do bazy danych!',
            link: '/page-sections/list',
            linkMessage: 'Powrót do podstrony - sekcje strony głównej'
        });
    });
}

function renderAddNewPageSection(req, res, next) {
    render(req, res, next, app_states.NEW, pagesAdditionalText.NEW, save);
}

function renderEditPageSection(req, res, next) {
    res.send('edit existing page section');
}

function save() {
    console.log('save');

}

function render(req, res, next, appState, titles, saveMethod) {
    const {_id} = {...req.params};
    if (req.method === 'GET') {
        Promise.all([getAllTexts(), getAllHTMLs(), getAllGalleries(),getPageSection(_id)]).then((results) => {
            let [texts, htmls, galleries, obj] = [...results];
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

        }).catch(() => {
            res.render('error-custom-msg.ejs', {
                error: null,
                title: 'Nie udało się pobrać niektórych elementów!',
                info: 'Wystąpił błąd dostępu do bazy danych!',
                link: '/page-sections/list',
                linkMessage: 'Powrót do podstrony - sekcje strony głównej'
            });
        })
    }
    if (req.method === 'POST') {

        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            let objToSave = {
                _id: req.body._id,
                title: req.body.title,
                nav_title: req.body.nav_title,
                content_type: req.body.content_type,
                elem_id: getElementIdFromRequest(req)
            };
            saveMethod(objToSave).then(() => {
                res.redirect('/texts/list');
            }).catch(() => {
                res.render('error-custom-msg.ejs', {
                    error: null,
                    title: 'Nie udało się zapisać elementu!',
                    info: 'Wystąpił błąd dostępu do bazy danych!',
                    link: '/texts/list',
                    linkMessage: 'Powrót do podstrony teksty'
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
                user: req.session.email,
            });
        }




        console.log(obj);

    }
}


module.exports = {
    renderListAllPageSections, renderAddNewPageSection, renderEditPageSection
}