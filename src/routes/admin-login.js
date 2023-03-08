const express = require('express');
const {checkAdmin} = require("../model/admin-model");
const {getObjectFromRequestParams} = require("../utils/utils");
const router = express.Router();


router.get("/login", (req, res, next) => {
    res.render('login.ejs', {pageTitle: 'Logowanie'});
});

router.post("/login", (req, res, next) => {
    const userData = getObjectFromRequestParams(req, true);
    checkAdmin(userData).then((result) => {
        if (result) {
            req.session.loggedIn = true;
            req.session.email = userData.email;
            req.session.save(()=>{
                res.redirect('/page-sections/list');
            });
        }

    }).catch((err) => {
        console.log(err);
        console.log('Nieudane logowanie');
    });


});


router.get("/logout", (req, res, next) => {
    console.log('log out');
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


module.exports = router;