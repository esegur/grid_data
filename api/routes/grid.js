const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Grid = require('../models/grid');
const Program = require('../models/programs');
const Material = require('../models/materials');

//Controllers
const GridController = require('../controllers/grid');

//routes
router.get('/', GridController.grid_get_all);

router.post('/', GridController.post_grid);

router.get('/:gridId', GridController.get_grid_by_id);

//router.get('/week/:gridWeek', GridController.get_gridWeek);

router.get('/:gridDate/:gridProgram', GridController.get_gridProgram_by_gridDate);

//router.get('/:gridId/:gridProgram', GridController.get_gridProgram_by_gridId);

router.patch('/:gridId', GridController.patch_grid);

module.exports = router;