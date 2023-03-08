const express = require('express');
const {renderAdditionalSettings} = require("../controller/admin-additional-controller");
const {isLoggedIn} = require("../controller/admin-isLoggedIn-middleware");
const router = express.Router();

router.get('/additional-settings', isLoggedIn, renderAdditionalSettings);

module.exports = router;