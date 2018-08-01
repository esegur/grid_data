const mongoose = require('mongoose');

const cannedSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    originalTitle: { type: String, required: false,default: "Im a default title"},
    ownTitle: { type: String, required: false},
    listTitle: { type: String, required: false},
    codMaterial: { type: String, required: false},
    materialType: { type: String, required: false},
    numChapters: { type: String, required: false},
    duration: { type: String, required: false},
    costCenter: { type: String, required: false},
    validities: { type: [], required: false},
    windowsDates: { type: [], required: false},
    checkedSignals: { type: [], required: false},
    contract: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: false }]
},{
    collection: 'canned'
});

module.exports = mongoose.model('CannedMaterial', cannedSchema);