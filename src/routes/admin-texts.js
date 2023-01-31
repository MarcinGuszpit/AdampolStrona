const express = require('express');
const data = require("../model/data");
const router = express.Router();

router.use('/texts/list', (req, res, next) => {
    const page = (data.pages).find((elem) => {
        return (elem.id === 'texts');
    });

    res.render('texts-settings.ejs', {
        page,
        pageTitle: page.pageTitle,
        sections: data.page_titles,
        selectedPage: page.id,
        pages: data.pages,
        //user: false
        user: data.user,
        languages: data.languages,
        contentTypes: data.contentTypes
    });
});

router.use('/texts/add-new', (req, res, next) => {
    res.send('add new html fragments');
});

router.use('/texts/edit/:id', (req, res, next) => {
    res.send('html fragments');
});

module.exports = router;