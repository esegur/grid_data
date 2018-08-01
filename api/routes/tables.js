const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TablesController = require('../controllers/tables');

const Table = require("../models/tables");

router.get('/', TablesController.tables_get_all);

router.post('/', TablesController.post_table);

router.put('/:id', TablesController.put_table);

router.patch('/:tableId', TablesController.patch_table);

router.get('/:tableId', TablesController.get_table_by_id);


module.exports = router;