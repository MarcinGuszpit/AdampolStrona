const data = require("../model/data");
const {findPage, getObjectFromRequestParams, extractErrors, getObject} = require("../utils/utils");
const {addNewHTML, saveHTML, getHTML, getAll} = require('../model/htmls-model');
const {app_states} = require("../utils/enums");
const {validationResult} = require("express-validator");
const {saveText} = require("../model/texts-model");

const objFields = ['id', 'description', 'html'];

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

const page = findPage('html');

const headers = {
    description: 'Opis',
    text: 'Fragment HTML'
};

function renderAllHTML(req, res, next) {
    res.render('html/html-list.ejs', {
        page,
        subTitle: pagesAdditionalText.LIST.subTitle,
        description: pagesAdditionalText.LIST.description,
        pages: data.pages,
        user: data.user,
        txtHeaders: headers,
        showButtons: true,
        data: getAll()
    });
}

function renderAddNewHTML(req, res, next) {
    const obj = getObject(app_states.NEW, req, objFields, getHTML);
    if (req.method === 'POST') {

        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            addNewHTML(getObjectFromRequestParams(req, true));
            res.redirect('/html/list');

        } else {
            const errors = extractErrors(valErrors, headers);
            res.render('html/html-edit-new.ejs', {
                page,
                data: getObjectFromRequestParams(req, true),
                errors,
                subTitle: pagesAdditionalText.NEW.subTitle,
                description: pagesAdditionalText.NEW.description,
                pages: data.pages,
                user: data.user,
            });
        }
    }

    if (req.method === 'GET') {
        console.log(obj);
        res.render('html/html-edit-new.ejs', {
            page,
            data: obj,
            errors: {description: '', html: ''},
            subTitle: pagesAdditionalText.EDIT.subTitle,
            description: pagesAdditionalText.EDIT.description,
            pages: data.pages,
            user: data.user,
        });
    }

}

function renderEditHTML(req, res, next) {
    const htmlObj = getObject(app_states.EDIT, req, objFields, getHTML);
    if (req.method === 'POST') {
        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            saveHTML(getObjectFromRequestParams(req, true));
            res.redirect('/html/list');
        } else {
            const errors = extractErrors(valErrors, headers);
            res.render('html/html-edit-new.ejs', {
                page,
                data: getObjectFromRequestParams(req, true),
                errors,
                subTitle: pagesAdditionalText.NEW.subTitle,
                description: pagesAdditionalText.NEW.description,
                pages: data.pages,
                user: data.user,
            });
        }
    }
    if (req.method === 'GET') {
        if (htmlObj) {
            res.render('html/html-edit-new.ejs', {
                page,
                data: htmlObj,
                errors: {description: '', html: ''},
                subTitle: pagesAdditionalText.NEW.subTitle,
                description: pagesAdditionalText.NEW.description,
                pages: data.pages,
                user: data.user,
            });

        } else {
            res.render('error-custom-msg.ejs', {
                error: null,
                title: 'Brak wybranego elementu!',
                info: 'Element wybrany do edycji nie istnieje!'
            });
        }
    }
}

module.exports = {
    renderAllHTML,
    renderAddNewHTML,
    renderEditHTML
};

