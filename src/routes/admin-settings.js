const express = require('express');
const data = require("../model/data");
const router = express.Router();

router.use('/additional-settings', (req, res, next) => {

    const page = (data.pages).find((elem) => {
        return (elem.id === 'additional');
    });

    res.render('additional-settings.ejs', {
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

module.exports = router;