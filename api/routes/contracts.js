const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth");

const Contract = require('../models/contracts');

//Controllers
const ContractsController = require('../controllers/contracts');

//routes
router.get('/', ContractsController.contracts_get_all);

router.post('/', ContractsController.post_contract);

router.get('/:contractId', ContractsController.get_contract_by_id);

router.patch('/:contractId', ContractsController.patch_contract);

router.delete('/:contractId', ContractsController.delete_contract);

module.exports = router;