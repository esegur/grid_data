const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    programTitle: { type: String, required: false},
    src: { type: String, required: false, default:"https://www.unesale.com/ProductImages/Large/notfound.png"},
    codProgram: { type: String, required: false},
    validity: { type: [], required: false},
    scheduleStartHour: { type: String, required: false},
    scheduleStartMin: { type: String, required: false},
    scheduleEndHour: { type: String, required: false},
    scheduleEndMin: { type: String, required: false},
    programType: { type: String, default: ''},
    programClassification: { type: String, default: ''},
    programDescription: { type: String, default: ''},
    transmissionDays: { type:[], required: false},
    transmissionDaysDescription: { type:String, required: false},
    checkedSignals: { type:[], required: false}, 
    checkedSignalsDescription: { type: String, required: false}, 
    programCutting: { type:[], required: false}, 
    status: { type: Boolean, default: true},
    crushedPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: false}],
    replacementPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: false}],
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: false},
    date: { type: String, default: "00/00/00,00/00/00" }
},{
    collection: 'programs'
});

module.exports = mongoose.model('Program', programSchema);