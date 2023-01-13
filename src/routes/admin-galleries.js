const express = require('express');
const router = express.Router();

router.get('/galleries/list', (req, res, next) => {
    res.send('galleries');
});

router.get('/galleries/add-new', (req, res, next) => {
    res.send('add new galery');
});

router.get('/galleries/edit/:id', (req, res, next) => {
    res.send('edit gallary ');
});

module.exports = router;