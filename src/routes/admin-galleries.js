const express = require('express');
const {renderAllGalleries, renderAddNewGallery, renderEditGallery} = require("../controller/galleries-controller");
const router = express.Router();

router.get('/galleries/list',renderAllGalleries);

router.get('/galleries/add-new', renderAddNewGallery);

router.get('/galleries/edit/:id', renderEditGallery);

module.exports = router;