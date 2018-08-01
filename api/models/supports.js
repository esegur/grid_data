const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    root: { type: String, required: false},
    support: { type: String, required: false},
    supportDescription: { type: String, required: false},
    supportType: { type: String, required: false},
    supportTypeDescription: { type: String, required: false},
    storage: { type: String, required: false},
    storageDescription: { type: String, required: false},
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: false},
    chapters: { type:[], required: false},
    updateDate: { type: Date, default: Date.now }
},{
    collection: 'supports'
});

module.exports = mongoose.model('Support', supportSchema);