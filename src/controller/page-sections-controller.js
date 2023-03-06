const {findPage, emptyErrors, createEmptyObject, getObjectFromRequestParams, findInArray} = require("../utils/utils");
const data = require("../model/data");
const {getAllPageSections} = require("../model/pageSections-model");
const {app_states} = require("../utils/enums");
const {getAllTexts} = require("../model/texts-model");
const {getAllHTMLs} = require("../model/htmls-model");
const {getAllGalleries} = require("../model/galleries-model");

const pagesAdditionalText = {
    LIST: {
        subTitle: 'Sekcje strony głównej',
        description: 'Lista sekcji strony głównej',
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

const page = findInArray('pageSections', 'id', data.pages);
const objFields = ['_id', 'title', 'nav_title'];

function renderListAllPageSections(req, res, next) {
    getAllPageSections().then((results) => {
        res.render('page-sections/page-sections-list.ejs', {
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

    if (req.method === 'GET') {
        Promise.all([getAllTexts(), getAllHTMLs(), getAllGalleries()]).then((results) => {
            let obj = createEmptyObject(objFields);
            let [texts, htmls, galleries] = [...results];

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
                user: data.user
            })

        }).catch(() => {

            res.render('error-custom-msg.ejs', {
                error: null,
                title: 'Nie udało się pobrać niektórych elementów!',
                info: 'Wystąpił błąd dostępu do bazy danych!'
            });
        })
    }
    if (req.method === 'POST') {
        console.log(getObjectFromRequestParams(req, true));
        res.send('post');
    }
}


module.exports = {
    renderListAllPageSections,
    renderAddNewPageSection,
    renderEditPageSection
}