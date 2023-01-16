const express = require('express');
const router = express.Router();
const {v4} = require('uuid');

router.get("/login", (req, res, next) => {
    console.log(req.session);
    res.render('login.ejs', {pageTitle: 'Logowanie'});
});

router.post("/login", (req, res, next) => {
    req.session.uniqeIdentifier = v4();
    req.session.loggedIn = true;
    console.log(req.body);
    console.log('Logowanie');
    res.send('Logowanie obsługa');
});


router.get("/logout", (req, res, next) => {
    console.log('log out');
    res.redirect('/login');
});


module.exports = router;