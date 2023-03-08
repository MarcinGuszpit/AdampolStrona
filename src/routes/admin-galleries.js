const express = require('express');
const {renderAllGalleries, renderAddNewGallery, renderEditGallery} = require("../controller/galleries-controller");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");
const router = express.Router();

router.get('/galleries/list', isLoggedIn, renderAllGalleries);

router.get('/galleries/add-new', isLoggedIn, renderAddNewGallery);

router.get('/galleries/edit/:id', isLoggedIn, renderEditGallery);

module.exports = router;