const Program = require('../models/programs');
const Material = require('../models/materials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.programs_get_all = (req, res, next) => {
    Program.find()
    .sort({_id:-1})
    .populate('material')
    .select('_id programTitle src codProgram validity scheduleStartHour scheduleEndHour checkedSignalsDescription scheduleStartMin scheduleEndMin programType crushedPrograms replacementPrograms programClassification programDescription status programCutting transmissionDays transmissionDaysDescription checkedSignals material date')
    .populate('crushedPrograms replacementPrograms')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            programs:docs.map(doc => {
                return {
                    _id: doc._id,
                    programTitle: doc.programTitle,
                    src: doc.src,
                    codProgram: doc.codProgram,
                    validity: doc.validity,
                    scheduleStartHour: doc.scheduleStartHour,
                    scheduleStartMin: doc.scheduleStartMin,
                    scheduleEndHour: doc.scheduleEndHour,
                    scheduleEndMin: doc.scheduleEndMin,
                    programType: doc.programType,
                    programClassification: doc.programClassification,
                    programDescription: doc.programDescription,
                    transmissionDays: doc.transmissionDays,
                    transmissionDaysDescription: doc.transmissionDaysDescription,
                    checkedSignals: doc.checkedSignals,
                    checkedSignalsDescription: doc.checkedSignalsDescription,
                    programCutting: doc.programCutting,
                    crushedPrograms: doc.crushedPrograms,
                    replacementPrograms: doc.replacementPrograms,
                    status: doc.status,
                    material: doc.material,
                    date: doc.date,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/programs/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
};

exports.post_program = (req, res, next) => {
  Material.findById(req.body.materialId)
    .then(material => {
        //if (!material) {
        //    return res.status(404).json({
        //        message: "Material not found"
        //    });
        
        //}
        const program = new Program({
            _id: mongoose.Types.ObjectId(),
            programTitle: req.body.programTitle,
            src: req.body.src,
            codProgram: req.body.codProgram,
            validity: req.body.validity,
            scheduleStartHour: req.body.scheduleStartHour,
            scheduleStartMin: req.body.scheduleStartMin,
            scheduleEndHour: req.body.scheduleEndHour,
            scheduleEndMin: req.body.scheduleEndMin,
            programType: req.body.programType,
            checkedSignalsDescription: req.body.checkedSignalsDescription,
            programClassification: req.body.programClassification,
            programDescription: req.body.programDescription,
            transmissionDays: req.body.transmissionDays,
            transmissionDaysDescription: req.body.transmissionDaysDescription,
            checkedSignals: req.body.checkedSignals, 
            programCutting: req.body.programCutting,
            crushedPrograms: req.body.crushedPrograms,
            replacementPrograms: req.body.replacementPrograms,
            status: req.body.status,
            material: req.body.materialId,
            date: req.body.date
        });
         return program.save()
         .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Program stored',
                createdProgram: {
                    _id: result._id,
                    programTitle: result.programTitle,
                    src: result.src,
                    codProgram: result.codProgram,
                    validity: result.validity,
                    scheduleStartHour: result.scheduleStartHour,
                    scheduleStartMin: result.scheduleStartMin,
                    scheduleEndHour: result.scheduleEndHour,
                    scheduleEndMin: result.scheduleEndMin,
                    programType: result.programType,
                    programClassification: result.programClassification,
                    programDescription: result.programDescription,
                    transmissionDays: result.transmissionDays,
                    transmissionDaysDescription: result.transmissionDaysDescription,
                    checkedSignals: result.checkedSignals, 
                    checkedSignalsDescription: result.checkedSignalsDescription,
                    programCutting: result.programCutting,
                    crushedPrograms: result.crushedPrograms,
                    replacementPrograms: result.replacementPrograms,
                    status: result.status,
                    material: result.materialId,
                    date: result.date          
                },
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/programs/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
    })
    
}

exports.get_program_by_id = (req, res, next) => {
    Program.findById(req.params.programId)
        .populate('material')
        .exec()
        .then(program => {
            if (!program) {
                return res.status(404).json({
                    message: "Program not found"
                });
            }
            res.status(200).json({
                program: program,
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/programs'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.patch_program = (req, res, next) => {
    const id = req.params.programId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Program.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Program updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/programs/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}

exports.delete_program = (req, res, next) => {
    Program.remove({ _id: req.params.programId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Program deleted',
                request: {
                    type: "POST",
                    url: "https://griddata.herokuapp.com/programs",
                    body: { materialId: "ID", quantity: "Number" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}