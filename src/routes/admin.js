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


router.use("/other-settings/list", (req, res, next) => {
    res.send('other settings');
});

router.use("/languages/list", (req, res, next) => {
    res.send('languages');
});

router.get('/galleries/list', (req, res, next) => {
    res.send('galleries');
});

router.get('/galleries/add-new', (req, res, next) => {
    res.send('add new galery');
});

router.get('/galleries/edit/:id', (req, res, next) => {
    res.send('edit gallary ');
});

router.use('/html-fragments/list', (req, res, next) => {
    res.send('html fragments');
});

module.exports = router;