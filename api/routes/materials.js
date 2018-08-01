const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const MaterialsController = require('../controllers/materials');

//storage strategy
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './updates/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//multer strore all files in this path
const update = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Material = require('../models/materials');

router.get('/', MaterialsController.materials_get_all);

router.post('/', MaterialsController.post_new_material);

router.put('/:materialId', MaterialsController.put_material);

router.get('/:materialId', MaterialsController.get_material_by_id);

router.patch('/:materialId', MaterialsController.patch_material);

router.delete('/:materialId', MaterialsController.delete_material);

module.exports = router;