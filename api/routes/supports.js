const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Support = require('../models/supports');
const Material = require('../models/materials');

//Controllers
const SupportsController = require('../controllers/supports');

//routes
router.get('/', SupportsController.supports_get_all);

router.post('/', SupportsController.post_support);

router.get('/:supportId', SupportsController.get_support_by_id);

router.patch('/:supportId', SupportsController.patch_support);

router.delete('/:supportId', SupportsController.delete_support);

module.exports = router;