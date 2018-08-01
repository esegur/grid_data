const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Segment = require('../models/segments');

//Controllers
const SegmentsController = require('../controllers/segments');

//routes
router.get('/', SegmentsController.segments_get_all);

router.post('/', SegmentsController.post_segment);

router.put('/:segmentId', SegmentsController.put_segment);

router.get('/:segmentId', SegmentsController.get_segment_by_id);

router.patch('/:segmentId', SegmentsController.patch_segment);

router.delete('/:segmentId', SegmentsController.delete_segment);

module.exports = router;