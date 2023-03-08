const express = require('express');
const router = express.Router();
const {renderAllHTML, renderAddNewHTML, renderEditHTML} = require('../controller/html-controller')
const {check} = require("express-validator");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");

router.use('/html/list', isLoggedIn, renderAllHTML);

router.use('/html/add-new', isLoggedIn, [
    check('description').notEmpty().withMessage('brak opisu elementu!'),
    check('html').notEmpty().withMessage('brak fragmentu html!')], renderAddNewHTML);

router.use('/html/edit/:_id', isLoggedIn, [
    check('description').notEmpty().withMessage('brak opisu elementu!'),
    check('html').notEmpty().withMessage('brak fragmentu html!')], renderEditHTML);

module.exports = router;