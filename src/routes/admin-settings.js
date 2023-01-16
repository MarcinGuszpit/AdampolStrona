const express = require('express');
const data = require("../model/data");
const router = express.Router();

router.use('/additional-settings', (req, res, next) => {
    res.render('additional-settings.ejs', {
        pageTitle: 'Dodatkowe ustawienia',
        sections: data.page_titles,
        selectedPage: data.selectedPageId,
        pages: data.pageSections,
        //user: false
        user: data.user,
        languages: data.languages,
        contentTypes: data.contentTypes
    });
});

const x = "additional";

module.exports = router;