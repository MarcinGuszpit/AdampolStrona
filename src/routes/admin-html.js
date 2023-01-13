const express = require('express');
const router = express.Router();

router.use('/html-fragments/list', (req, res, next) => {
    res.send('html fragments');
});

router.use('/html-fragments/add-new', (req, res, next) => {
    res.send('add new html fragments');
});

router.use('/html-fragments/edit/:id', (req, res, next) => {
    res.send('html fragments');
});

module.exports = router;