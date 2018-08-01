const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    week: { type: String, required: false},
    programs: [{ 
        _id: mongoose.Schema.Types.ObjectId,
        programGridTitle: String,
        artisticDuration: String,
        chapters: [],
        dailyProgramDate: String,
        completeDate: String,
        scheduleStartHour:String,
        scheduleStartMin: String,
        scheduleEndHour: String,
        scheduleEndMin: String,
        dailyCuttingProgram: [],
        crushedPrograms: [],
        replacementPrograms: [],
        materialTitle: String,
        codMaterial: String,
        material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: false },
        refProgram: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: false}
    }]
},{
    collection: 'grids'
});

module.exports = mongoose.model('Grid', gridSchema);