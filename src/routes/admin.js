const express = require('express');
const router = express.Router();


router.get("/login", (req, res, next) => {
    res.send('login');
});

router.use("/other-settings", (req, res, next) => {
    res.send('other settings');
});

router.use("/languages", (req, res, next) => {
    res.send('languages');
});

router.use('/galleries', (req, res, next) => {
    res.send('galleries');
});

router.use('/html-fragments', (req, res, next) => {
    res.send('html fragments');
});

module.exports = router;