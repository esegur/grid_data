const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    segmentTitle: { type: String, required: false},
    codSegment: { type: String, required: false},
    validity: { type: [], required: false},
    scheduleStartHour: { type: String, required: false},
    scheduleStartMin: { type: String, required: false},
    scheduleEndHour: { type: String, required: false},
    scheduleEndMin: { type: String, required: false},
    segmentType: { type: String, default: 'Largometraje'},
    segmentClassification: { type: String, default: 'APT'},
    segmentDescription: { type: String, default: 'Apto para todo publico'},
    transmissionDays: { type:[], required: false},
    transmissionDaysDescription: { type:String, required: false},
    date: { type: String, default: "00/00/00,00/00/00" },
    checkedSignals: { type:[], required: false}, 
    status: { type: Boolean, default: true}
},{
    collection: 'segments'
});

module.exports = mongoose.model('Segment', segmentSchema);