const express = require('express');
const {showAdminSettings, editAdminSettings} = require("../controller/admin-settings-controller");
const {check} = require("express-validator");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");

const router = express.Router();

router.get('/admin/list', isLoggedIn, showAdminSettings);
router.use('/admin/edit', isLoggedIn, [
        check('name').notEmpty().withMessage('Nazwa użytkownika nie może być pusta!'),
        check('email').notEmpty().isEmail().withMessage('Wpisana wartość musi być prawidłowym adresem email!'),
        check('password').notEmpty().isLength({min: 5})
            .withMessage('Hasło musi się składać z przynajmniej 5 znaków!'),
        check('new_password').custom((value, {req}) => {
                const formValues = {...req.body};
                if (formValues && formValues.password === value) {
                    return true;
                }
                return false;
            }
        ).withMessage('Wartość wpisana w to pole musi być taka sama jak hasło!')],
    editAdminSettings);


module.exports = router;