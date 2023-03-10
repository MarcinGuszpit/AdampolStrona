const express = require('express');
const {renderAllTexts, renderAddNewText, renderEditText} = require("../controller/text-controller");
const {check} = require("express-validator");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");

const router = express.Router();

router.get('/texts/list', isLoggedIn, renderAllTexts);

router.use('/texts/edit/:_id', isLoggedIn, [
        check('description').notEmpty().withMessage('brak opisu '),
        check('text').notEmpty().withMessage('brak wpisu tekstowego')],
    renderEditText);

router.use('/texts/add-new', [
        check('description').notEmpty().withMessage('brak opisu '),
        check('text').notEmpty().withMessage('brak wpisu tekstowego')],
    renderAddNewText);


module.exports = router;