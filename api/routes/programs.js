const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Program = require('../models/programs');
const Material = require('../models/materials');

//Controllers
const ProgramsController = require('../controllers/programs');

//routes
router.get('/', ProgramsController.programs_get_all);

router.post('/', ProgramsController.post_program);

router.get('/:programId', ProgramsController.get_program_by_id);

router.patch('/:programId', ProgramsController.patch_program);

router.delete('/:programId', ProgramsController.delete_program);

module.exports = router;