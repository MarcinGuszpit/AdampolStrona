const express = require('express');
const router = express.Router();
const {renderAllHTML, renderAddNewHTML, renderEditHTML} = require('../controller/html-controller')

router.use('/html/list', renderAllHTML);

router.use('/html/add-new', renderAddNewHTML);

router.use('/html/edit/:_id', renderEditHTML);

module.exports = router;