const express = require('express');
const data = require("../model/data");
const {check, validationResult} = require('express-validator');
const {extractErrors, getObjectFromRequestParams} = require("../utils/utils");
const {saveText} = require("../controller/texts");

const router = express.Router();

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

const app_states = {
    NEW: 'adding new element',
    EDIT: 'editing existing element',
    REMOVE: 'removing element'
}


const page = (data.pages).find((elem) => {
    return (elem.id === 'texts');
});

router.get('/texts/list', (req, res, next) => {


    res.render('texts/texts-settings.ejs', {
        page,
        pageTitle: page.pageTitle,
        subTitle: pagesAdditionalText.LIST.subTitle,
        description: pagesAdditionalText.LIST.description,
        selectedPage: page.id,
        pages: data.pages,
        user: data.user,

        txtHeaders: headers,
        showButtons: true,
        txtData: data.texts

    });
});

router.use('/texts/add-new',
    check('description').notEmpty().withMessage('brak opisu '),
    check('text').notEmpty().withMessage('brak wpisu tekstowego'),
    (req, res, next) => {

        const textObj = {
            id: '',
            description: '',
            text: '',
        }

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
                    state: app_states.NEW,
                    subTitle: pagesAdditionalText.NEW.subTitle,
                    description: pagesAdditionalText.NEW.description,
                    pageTitle: page.pageTitle,
                    selectedPage: page.id,
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
                state: app_states.NEW,
                subTitle: pagesAdditionalText.NEW.subTitle,
                description: pagesAdditionalText.NEW.description,
                pageTitle: page.pageTitle,
                selectedPage: page.id,
                pages: data.pages,
                user: data.user,
            });


        }

        //console.log(req.body);


    });

router.use('/texts/edit/:id', (req, res, next) => {

    console.log(req.params);

    res.render('texts/text-edit-new.ejs', {
        page,
        state: app_states.EDIT,
        pageTitle: page.pageTitle,
        subTitle: pagesAdditionalText.EDIT.subTitle,
        description: pagesAdditionalText.EDIT.description,
        selectedPage: page.id,
        pages: data.pages,
        user: data.user,
    });
});

module.exports = router;