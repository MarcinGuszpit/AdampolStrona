const express = require('express');
const {
    renderListAllPageSections,
    renderAddNewPageSection,
    renderEditPageSection
} = require("../controller/page-sections-controller");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");
const router = express.Router();

router.get('/page-sections/list', isLoggedIn, renderListAllPageSections);

router.use('/page-sections/add-new', isLoggedIn, renderAddNewPageSection);

router.use('/page-sections/edit/:id', isLoggedIn, renderEditPageSection);

module.exports = router;