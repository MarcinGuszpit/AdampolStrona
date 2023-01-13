const express = require('express');
const router = express.Router();

router.get('/page-sections/list', (req, res, next) => {
    res.send('galleries');
});

router.get('/page-sections/add-new', (req, res, next) => {
    res.send('add new galery');
});

router.get('/page-sections/edit/:id', (req, res, next) => {
    res.send('edit gallary ');
});

module.exports = router;