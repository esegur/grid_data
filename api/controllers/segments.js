const Segment = require('../models/segments');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.segments_get_all = (req, res, next) => {
    Segment
    .find()
    .sort({_id:-1})
    .select('_id segmentTitle codSegment validity scheduleStartHour scheduleEndHour scheduleStartMin scheduleEndMin segmentType segmentClassification segmentDescription status date transmissionDays transmissionDaysDescription checkedSignals')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            segments:docs.map(doc => {
                return {
                    _id: doc._id,
                    segmentTitle: doc.segmentTitle,
                    codSegment: doc.codSegment,
                    validity: doc.validity,
                    scheduleStartHour: doc.scheduleStartHour,
                    scheduleStartMin: doc.scheduleStartMin,
                    scheduleEndHour: doc.scheduleEndHour,
                    scheduleEndMin: doc.scheduleEndMin,
                    segmentType: doc.segmentType,
                    segmentClassification: doc.segmentClassification,
                    segmentDescription: doc.segmentDescription,
                    transmissionDays: doc.transmissionDays,
                    transmissionDaysDescription: doc.transmissionDaysDescription,
                    checkedSignals: doc.checkedSignals,
                    date: doc.date,
                    status: doc.status,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/segments/' + doc._id
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

exports.post_segment = (req, res, next) => {
    
    const segment = new Segment({
        _id: new mongoose.Types.ObjectId(),
        segmentTitle: req.body.segmentTitle,
        codSegment: req.body.codSegment,
        validity: req.body.validity,
        scheduleStartHour: req.body.scheduleStartHour,
        scheduleStartMin: req.body.scheduleStartMin,
        scheduleEndHour: req.body.scheduleEndHour,
        scheduleEndMin: req.body.scheduleEndMin,
        segmentType: req.body.segmentType,
        segmentClassification: req.body.segmentClassification,
        segmentDescription: req.body.segmentDescription,
        transmissionDays: req.body.transmissionDays,
        transmissionDaysDescription: req.body.transmissionDaysDescription,
        date: req.body.date,
        checkedSignals: req.body.checkedSignals,
        status: req.body.status,
    });
    segment.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created segment successfully',
            createdSegment: {
                _id: result._id,
                segmentTitle: result.segmentTitle,
                codSegment: result.codSegment,
                validity: result.validity,
                scheduleStartHour: result.scheduleStartHour,
                scheduleStartMin: result.scheduleStartMin,
                scheduleEndHour: result.scheduleEndHour,
                scheduleEndMin: result.scheduleEndMin,
                segmentType: result.segmentType,
                segmentClassification: result.segmentClassification,
                segmentDescription: result.segmentDescription,
                transmissionDays: result.transmissionDays,
                transmissionDaysDescription: result.transmissionDaysDescription,
                checkedSignals: result.checkedSignals,
                date: result.date,
                status: result.status,
                request: {
                    type: 'GET',
                    url: "https://griddata.herokuapp.com/segments/" + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.put_segment = (req, res, next) => {
    Segment.findById(req.params.segmentId, function (err, segment){
        if(!segment) {
            return res.status(404).send('No se ha encontrado el segmento');
        } else {
            segment.segmentTitle = req.body.segmentTitle,
            segment.codSegment = req.body.codSegment,
            segment.validity = req.body.validity,
            segment.scheduleStartHour = req.body.scheduleStartHour,
            segment.scheduleStartMin = req.body.scheduleStartMin,
            segment.scheduleEndHour = req.body.scheduleEndHour,
            segment.scheduleEndMin = req.body.scheduleEndMin,
            segment.segmentType = req.body.segmentType,
            segment.segmentClassification = req.body.segmentClassification,
            segment.segmentDescription = req.body.segmentDescription,
            segment.transmissionDays = req.body.transmissionDays,
            segment.transmissionDaysDescription = req.body.transmissionDaysDescription,
            segment.checkedSignals = req.body.checkedSignals,
            segment.date = req.body.date,
            segment.status = req.body.status,

            segment.save()
            .then(segment => {
                res.status(200).json('Segmento Actualizado completamente');
            })
            .catch(err => {
                res.status(400).send('Se ha producido un error al actualizar los datos del segmento');
            });
        }
    })
}

exports.get_segment_by_id = (req, res, next) => {
    const id = req.params.segmentId;
    Segment.findById(id)
        .select('_id segmentTitle codSegment validity scheduleStartHour scheduleEndHour scheduleStartMin scheduleEndMin segmentType segmentClassification segmentDescription date status transmissionDays transmissionDaysDescription checkedSignals')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    segment: doc,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/segments/'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.patch_segment = (req, res, next) => {
    const id = req.params.segmentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Segment.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Segment updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/segments/' + id
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

exports.delete_segment = (req, res, next) => {
    const id = req.params.segmentId;
    Material.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Segment deleted',
                request: {
                    type: 'POST',
                    url: 'https://griddata.herokuapp.com/segments/',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}