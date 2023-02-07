const express = require('express');
const data = require("../model/data");
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

const app_states = {
    NEW: 'adding new element',
    EDIT: 'editing existing element',
    REMOVE: 'removing element'
}


const page = (data.pages).find((elem) => {
    return (elem.id === 'texts');
});

router.use('/texts/list', (req, res, next) => {


    const headers = {
        description: 'Opis',
        text: 'Tekst'
    };

    console.log(Object.keys(headers));
    console.log(Object.values(headers));
    console.log(data.texts)


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

router.use('/texts/add-new', (req, res, next) => {

    console.log(req.body);

    res.render('texts/text-edit-new.ejs', {
        page,
        state: app_states.NEW,
        subTitle: pagesAdditionalText.NEW.subTitle,
        description: pagesAdditionalText.NEW.description,
        pageTitle: page.pageTitle,
        selectedPage: page.id,
        pages: data.pages,
        user: data.user,
    });
});

router.use('/texts/edit/:id', (req, res, next) => {
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