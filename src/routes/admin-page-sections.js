const express = require('express');
const {
    renderListAllPageSections,
    renderAddNewPageSection,
    renderEditPageSection
} = require("../controller/page-sections-controller");
const router = express.Router();

router.get('/page-sections/list', renderListAllPageSections);

router.use('/page-sections/add-new', renderAddNewPageSection);

router.use('/page-sections/edit/:id', renderEditPageSection);

module.exports = router;