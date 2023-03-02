const express = require('express');
const {showAdminSettings, editAdminSettings} = require("../controller/admin-settings-controller");
const {check} = require("express-validator");

const router = express.Router();

router.get('/admin/list', showAdminSettings);
router.use('/admin/edit', editAdminSettings);


module.exports = router;