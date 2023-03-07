const express = require('express');
const router = express.Router();


router.get("/login", (req, res, next) => {
    res.render('login.ejs', {pageTitle: 'Logowanie'});
});

router.post("/login", (req, res, next) => {
    req.session.loggedIn = true;
    res.redirect('/page-sections/list');
});


router.get("/logout", (req, res, next) => {
    console.log('log out');
    req.session.destroy(() => {

        res.redirect('/login');
    });
});


module.exports = router;