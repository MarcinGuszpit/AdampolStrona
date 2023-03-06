const express = require('express');
const {renderAdditionalSettings} = require("../controller/admin-additional-controller");
const router = express.Router();

router.get('/additional-settings',renderAdditionalSettings);

module.exports = router;