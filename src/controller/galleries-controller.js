const {findInArray, createEmptyObject, getObjectFromRequestParams} = require("../utils/utils");
const data = require("../model/data");
const {getAllGalleries} = require("../model/galleries-model");
const {validationResult} = require("express-validator");
const pagesAdditionalText = {
    LIST: {
        subTitle: 'Galerie obrazów',
        description: 'Lista galerii do wykorzystania',
    },
    NEW: {
        subTitle: 'Dodaj nową galerię',
        description: 'Dodawanie nowego galerii',
    },
    EDIT: {
        subTitle: 'Edytuj istniejącą galerię',
        description: 'Edycja galerii',
    }
}

const page = findInArray('galleries', 'id', data.pages);
const objFields = ['_id', 'name', 'description', 'images'];


function renderAllGalleries(req, res, next) {
    getAllGalleries().then((results) => {
        res.render('galleries/galleries-list.ejs', {
            page,
            subTitle: pagesAdditionalText.LIST.subTitle,
            description: pagesAdditionalText.LIST.description,
            pages: data.pages,
            user: req.session.email,
            data: results
        });
    });
}

function renderAddNewGallery(req, res, next) {
    if (req.method === 'GET') {
        let obj = createEmptyObject(objFields);
        res.render('galleries/gallery-edit-new.ejs', {
            page,
            data: obj,
            errors: null,
            subTitle: pagesAdditionalText.NEW.subTitle,
            description: pagesAdditionalText.NEW.description,
            pages: data.pages,
            user: req.session.email,
        });
    }

    if (req.method === 'POST') {
        console.log(req.file);
        res.redirect('/galleries/list');
    }
}

function renderEditGallery(req, res, next) {
    res.send('edit galeries');
}

module.exports = {
    renderAddNewGallery,
    renderEditGallery,
    renderAllGalleries
}
