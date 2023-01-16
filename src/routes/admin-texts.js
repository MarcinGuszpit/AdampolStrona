const express = require('express');
const router = express.Router();

router.use('/text/list', (req, res, next) => {
    res.send('html fragments');
});

router.use('/text/add-new', (req, res, next) => {
    res.send('add new html fragments');
});

router.use('/text/edit/:id', (req, res, next) => {
    res.send('html fragments');
});

module.exports = router;