const express = require('express');
const {checkAdmin} = require("../model/admin-model");
const {getObjectFromRequestParams} = require("../utils/utils");
const router = express.Router();


router.get("/login", (req, res, next) => {
    res.render('login.ejs', {pageTitle: 'Logowanie', error: false, errorMsg: null});
});

router.post("/login", (req, res, next) => {
    const userData = getObjectFromRequestParams(req, true);
    checkAdmin(userData).then((result) => {
        if (result) {
            req.session.loggedIn = true;
            req.session.email = userData.email;
            req.session.save(() => {
                res.redirect('/page-sections/list');
            });

        } else {
            res.render('login.ejs', {pageTitle: 'Logowanie', error: true, errorMsg: 'Niepoprawne dane logowania!'});
        }

    }).catch(() => {
        res.render('error-custom-msg.ejs', {
            error: null,
            title: 'Wystąpił błąd!',
            info: 'Coś poszło nie tak podczas logowania!',
            link: '/login',
            linkMessage: 'Powrót do formularza logowania'
        });
    });
});


router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


module.exports = router;