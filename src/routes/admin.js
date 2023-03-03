const express = require('express');
const router = express.Router();


router.get("/login", (req, res, next) => {
    res.render('login.ejs', {pageTitle: 'Logowanie'});
});

router.post("/login", (req, res, next) => {
    req.session.loggedIn = true;
    console.log(req.body);
    res.send('Logowanie obsługa');
});


router.get("/logout", (req, res, next) => {
    console.log('log out');
    res.redirect('/login');
});


module.exports = router;