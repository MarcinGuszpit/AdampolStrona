const express = require('express');
const router = express.Router();
const {renderAllHTML, renderAddNewHTML, renderEditHTML} = require('../controller/html-controller')
const {check} = require("express-validator");

router.use('/html/list', renderAllHTML);

router.use('/html/add-new', [
    check('description').notEmpty().withMessage('brak opisu elementu!'),
    check('html').notEmpty().withMessage('brak fragmentu html!')], renderAddNewHTML);

router.use('/html/edit/:_id',[
    check('description').notEmpty().withMessage('brak opisu elementu!'),
    check('html').notEmpty().withMessage('brak fragmentu html!')], renderEditHTML);

module.exports = router;