const {app_states} = require("../utils/enums");
const {createEmptyObject, extractErrors, findPage, getObjectFromRequestParams, getObject} = require("../utils/utils");
const {getAllTexts, getText, saveText, addNewText} = require("../model/texts-model");
const {validationResult} = require("express-validator");
const data = require('../model/data');

const objFields = ['id', 'description', 'text'];
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
    res.render('texts/texts-settings.ejs', {
        page,
        subTitle: pagesAdditionalText.LIST.subTitle,
        description: pagesAdditionalText.LIST.description,
        pages: data.pages,
        user: data.user,
        txtHeaders: headers,
        showButtons: true,
        txtData: getAllTexts()
    });
}

function renderAddNewText(req, res, next) {
    console.log('new text');
    console.log(getEmptyErrors(objFields));
    const textObj = getObject(app_states.NEW, req, objFields, getText);
    if (req.method === 'POST') {

        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            addNewText(getObjectFromRequestParams(req, true));
            res.redirect('/texts/list');

        } else {
            const errors = extractErrors(valErrors, headers);
            res.render('texts/text-edit-new.ejs', {
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

        res.render('texts/text-edit-new.ejs', {
            page,
            data: textObj,
            errors: {description: '', text: ''},
            subTitle: pagesAdditionalText.NEW.subTitle,
            description: pagesAdditionalText.NEW.description,
            pages: data.pages,
            user: data.user,
        });
    }
}

function renderEditText(req, res, next) {
    console.log('edit text');
    if (req.method === 'POST') {
        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            saveText(getObjectFromRequestParams(req, true));
            res.redirect('/texts/list');
        } else {
            const errors = extractErrors(valErrors, headers);
            res.render('texts/text-edit-new.ejs', {
                page,
                data: getObjectFromRequestParams(req, true),
                errors,
                subTitle: pagesAdditionalText.EDIT.subTitle,
                description: pagesAdditionalText.EDIT.description,
                pages: data.pages,
                user: data.user,
            });
        }
    }
    if (req.method === 'GET') {
        const textObj = getObject(app_states.EDIT, req, objFields, getText);
        if (textObj) {
            res.render('texts/text-edit-new.ejs', {
                page,
                data: textObj,
                errors: {description: '', text: ''},
                subTitle: pagesAdditionalText.EDIT.subTitle,
                description: pagesAdditionalText.EDIT.description,
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

function render(req, res, next, appState, titles,saveMethod) {
    const obj = getObject(appState, req, objFields, getText);
    if (req.method === 'POST') {
        const valErrors = validationResult(req).array();
        if (valErrors.length === 0) {
            const objToSave = getObjectFromRequestParams(req, true);
            saveMethod(objToSave);
            res.redirect('/texts/list');
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

}

function getEmptyErrors(objFields) {
    const obj = {}
    objFields.forEach(elem => {
        if (!(elem === 'id')) {
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