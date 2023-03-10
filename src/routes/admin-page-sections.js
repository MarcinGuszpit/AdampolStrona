const express = require('express');
const {
    renderListAllPageSections,
    renderAddNewPageSection,
    renderEditPageSection
} = require("../controller/page-sections-controller");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");
const {check} = require("express-validator");
const router = express.Router();

router.get('/page-sections/list', isLoggedIn, renderListAllPageSections);

router.use('/page-sections/add-new', isLoggedIn, [check('title').notEmpty().withMessage('brak tytułu sekcji!'),
    check('nav_title').notEmpty().withMessage('brak tytułu do menu głównego strony!')], renderAddNewPageSection);

router.use('/page-sections/edit/:_id', isLoggedIn, [check('title').notEmpty().withMessage('brak tytułu sekcji!'),
    check('nav_title').notEmpty().withMessage('brak tytułu do menu głównego strony!')], renderEditPageSection);

module.exports = router;