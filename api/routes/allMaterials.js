const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const AllMaterialsController = require('../controllers/allMaterials');

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


router.get('/', AllMaterialsController.allMaterials_get_all);

// router.post('/', AllMaterialsController.post_new_allMaterial);

// router.put('/:cannedMaterialId', CannedMaterialsController.put_cannedMaterial);

// router.get('/:cannedMaterialId', CannedMaterialsController.get_cannedMaterial_by_id);

// router.patch('/:cannedMaterialId', CannedMaterialsController.patch_cannedMaterial);

// router.delete('/:cannedMaterialId', CannedMaterialsController.delete_cannedMaterial);

module.exports = router;