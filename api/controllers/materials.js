const Program = require('../models/programs');
const Material = require('../models/materials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.materials_get_all = (req, res, next) => {
    Material
    .find()
    .sort({_id:-1})
    .select('originalTitle scheduledTimes typeOfCannedMaterial systemCode unitPrice providerCode provider totalPass arrivalDate emissions newNetDuration ownTitle listTitle _id codMaterial productionCompany netDuration codProgram materialType classification cutAllChapters rankChapters individualEntryOfChapters supportsRelated videoCutting numClassification broadcastPrice broadcastCredit mainActors secondaryActors validity costCenter numCenter genre director allMusicalThemes minTimeTheme secTimeTheme checkedSignals numChapters updateDate hoursMaterial minutesMaterial uploadDate status canned')
    .populate('supportsRelated')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                materials: docs.map(doc => {
                    return {
                        __id: doc._id,
                        originalTitle: doc.originalTitle,
                        ownTitle: doc.ownTitle,
                        listTitle: doc.listTitle,
                        codMaterial: doc.codMaterial,
                        codProgram: doc.codProgram,
                        materialType: doc.materialType,
                        classification: doc.classification,
                        numClassification: doc.numClassification,
                        typeOfCannedMaterial: doc.typeOfCannedMaterial,
                        broadcastPrice: doc.broadcastPrice,
                        broadcastCredit: doc.broadcastCredit,
                        mainActors: doc.mainActors,
                        secondaryActors: doc.secondaryActors,
                        validity: doc.validity,
                        costCenter: doc.costCenter,
                        numCenter: doc.numCenter,
                        genre: doc.genre,
                        systemCode: doc.systemCode,
                        director: doc.director,
                        allMusicalThemes: doc.allMusicalThemes,
                        hoursMaterial: doc.hoursMaterial,
                        minutesMaterial: doc.minutesMaterial,
                        minTimeTheme: doc.minTimeTheme,
                        secTimeTheme: doc.secTimeTheme,
                        checkedSignals: doc.checkedSignals,
                        numChapters: doc.numChapters,
                        uploadDate: doc.uploadDate,
                        supportsRelated: doc.supportsRelated,
                        videoCutting: doc.videoCutting,
                        cutAllChapters: doc.cutAllChapters,
                        rankChapters: doc.rankChapters,
                        individualEntryOfChapters: doc.individualEntryOfChapters,
                        status: doc.status,
                        canned: doc.canned,
                        scheduledTimes: doc.scheduledTimes,
                        newNetDuration: doc.newNetDuration,
                        productionCompany: doc.productionCompany,
                        unitPrice: doc.unitPrice,
                        providerCode: doc.providerCode,
                        provider: doc.provider,
                        totalPass: doc.totalPass,
                        arrivalDate: doc.arrivalDate,
                        emissions: doc.emissions,
                        netDuration: doc.netDuration,
                        request: {
                            type: 'GET',
                            url: 'https://griddata.herokuapp.com/materials/' + doc._id
                        }
                    }
                })
            };
           // if (docs.length >= 0) {
            res.status(200).json(response);
            //} else {
            //    res.status(404).json({
            //        message: 'Not entries found'
            //    }) 
            //}
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.post_new_material = (req, res, next) => {
    
    const material = new Material({
        _id: new mongoose.Types.ObjectId(),
        originalTitle: req.body.originalTitle,
        ownTitle: req.body.ownTitle,
        listTitle: req.body.listTitle,
        codMaterial: req.body.codMaterial,
        codProgram: req.body.codProgram,
        materialType: req.body.materialType,
        classification: req.body.classification,
        numClassification: req.body.numClassification,
        broadcastPrice: req.body.broadcastPrice,
        broadcastCredit: req.body.broadcastCredit,
        typeOfCannedMaterial:req.body.typeOfCannedMaterial,
        mainActors: req.body.mainActors,
        secondaryActors: req.body.secondaryActors,
        validity: req.body.validity,
        costCenter: req.body.costCenter,
        numCenter: req.body.numCenter,
        systemCode: req.body.systemCode,
        genre: req.body.genre,
        director: req.body.director,
        allMusicalThemes: req.body.allMusicalThemes,
        hoursMaterial: req.body.hoursMaterial,
        minutesMaterial: req.body.minutesMaterial,
        minTimeTheme: req.body.minTimeTheme,
        secTimeTheme: req.body.secTimeTheme,
        checkedSignals: req.body.checkedSignals,
        numChapters: req.body.numChapters,
        uploadDate: req.body.uploadDate,
        updateDate: req.body.updateDate,
        supportsRelated: req.body.supportsRelated,
        videoCutting: req.body.videoCutting,
        cutAllChapters: req.body.cutAllChapters,
        rankChapters: req.body.rankChapters,
        individualEntryOfChapters: req.body.individualEntryOfChapters,
        productionCompany: req.body.productionCompany,
        netDuration: req.body.netDuration,
        status: req.body.status,
        newNetDuration: req.body.newNetDuration,
        canned: req.body.canned,       
        scheduledTimes: req.body.scheduledTimes,
        unitPrice: req.body.unitPrice,
        providerCode: req.body.providerCode,
        provider: req.body.provider,
        totalPass: req.body.totalPass,
        arrivalDate: req.body.arrivalDate,
        emissions: req.body.emissions,                  
    });
    material.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created material successfully',
            createdMaterial: {
                _id: result._id,
                originalTitle: result.originalTitle,
                ownTitle: result.ownTitle,
                listTitle: result.listTitle,
                codMaterial: result.codMaterial,
                codProgram: result.codProgram,
                materialType: result.materialType,
                classification: result.classification,
                numClassification: result.numClassification,
                broadcastPrice: result.broadcastPrice,
                broadcastCredit: result.broadcastCredit,
                mainActors: result.mainActors,
                typeOfCannedMaterial: result.typeOfCannedMaterial,
                secondaryActors: result.secondaryActors,
                validity: result.validity,
                costCenter: result.costCenter,
                numCenter: result.numCenter,
                systemCode: result.systemCode,
                genre: result.genre,
                director: result.director,
                allMusicalThemes: result.allMusicalThemes,
                hoursMaterial: result.hoursMaterial,
                minutesMaterial: result.minutesMaterial,
                minTimeTheme: result.minTimeTheme,
                secTimeTheme: result.secTimeTheme,
                checkedSignals: result.checkedSignals,
                numChapters: result.numChapters,
                uploadDate: result.uploadDate,
                updateDate: result.updateDate, 
                supportsRelated: result.supportsRelated,  
                videoCutting: result.videoCutting,    
                scheduledTimes: result.scheduledTimes, 
                cutAllChapters: result.cutAllChapters,
                rankChapters: result.rankChapters,
                individualEntryOfChapters: result.individualEntryOfChapters,
                status: result.status,
                canned: result.canned, 
                newNetDuration: result.newNetDuration,  
                netDuration: result.netDuration,       
                productionCompany: result.productionCompany,    
                unitPrice: result.unitPrice,
                providerCode: result.providerCode,
                provider: result.provider,
                totalPass: result.totalPass,
                arrivalDate: result.arrivalDate,
                emissions: result.emissions,              
                request: {
                    type: 'GET',
                    url: "https://griddata.herokuapp.com/materials/" + result._id
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

exports.put_material = (req, res, next) => {
    Material.findById(req.params.materialId, function (err, material){
        if(!material) {
            return res.status(404).send('No se ha encontrado el material');
        } else {
            material.originalTitle = req.body.originalTitle,
            material.ownTitle = req.body.ownTitle,
            material.listTitle = req.body.listTitle,
            material.codMaterial = req.body.codMaterial,
            material.codProgram = req.body.codProgram,
            material.materialType = req.body.materialType,
            material.classification = req.body.classification,
            material.numClassification = req.body.numClassification,
            material.broadcastPrice = req.body.broadcastPrice,
            material.broadcastCredit = req.body.broadcastCredit,
            material.mainActors = req.body.mainActors,
            material.secondaryActors = req.body.secondaryActors,
            material.validity = req.body.validity,
            material.costCenter = req.body.costCenter,
            material.typeOfCannedMaterial = req.body.typeOfCannedMaterial,
            material.numCenter = req.body.numCenter,
            material.genre = req.body.genre,
            material.director = req.body.director,
            material.systemCode = req.body.systemCode,
            material.allMusicalThemes = req.body.allMusicalThemes,
            material.hoursMaterial = req.body.hoursMaterial,
            material.minutesMaterial = req.body.minutesMaterial,
            material.minTimeTheme = req.body.minTimeTheme,
            material.secTimeTheme = req.body.secTimeTheme,
            material.checkedSignals = req.body.checkedSignals,
            material.scheduledTimes = req.body.scheduledTimes,
            material.numChapters = req.body.numChapters,
            material.uploadDate = req.body.uploadDate,
            material.updateDate = req.body.updateDate,
            material.supportsRelated = req.body.supportsRelated,
            material.videoCutting = req.body.videoCutting,
            material.cutAllChapters = req.body.cutAllChapters,
            material.rankChapters = req.body.rankChapters,
            material.individualEntryOfChapters = req.body.individualEntryOfChapters,
            material.productionCompany = req.body.productionCompany,
            material.netDuration = req.body.netDuration,
            material.newNetDuration = req.body.newNetDuration,
            material.status = req.body.status,
            material.canned = req.body.canned,                 
            material.unitPrice = req.body.unitPrice,
            material.providerCode = req.body.providerCode,
            material.provider = req.body.provider,
            material.totalPass = req.body.totalPass,
            material.arrivalDate = req.body.arrivalDate,
            material.emissions = req.body.emissions,          
            material.save()
            .then(material => {
                res.status(200).json('Material Actualizado completamente');
            })
            .catch(err => {
                res.status(400).send('Se ha producido un error al actualizar los datos del material');
            });
        }
    })
}

exports.get_material_by_id = (req, res, next) => {
    const id = req.params.materialId;
    Material.findById(id)
        .populate('supportsRelated')
        .select('originalTitle systemCode scheduledTimes typeOfCannedMaterial newNetDuration ownTitle listTitle _id codMaterial unitPrice providerCode provider totalPass arrivalDate emissions codProgram materialType productionCompany netDuration classification cutAllChapters rankChapters individualEntryOfChapters supportsRelated videoCutting numClassification broadcastPrice broadcastCredit mainActors secondaryActors validity costCenter numCenter genre director allMusicalThemes hoursMaterial minutesMaterial minTimeTheme secTimeTheme checkedSignals numChapters updateDate uploadDate status canned')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    material: doc,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/materials/'
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

exports.patch_material = (req, res, next) => {
    const id = req.params.materialId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Material.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Material updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/materials/' + id
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

exports.delete_material = (req, res, next) => {
    const id = req.params.materialId;
    Material.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Material deleted',
                request: {
                    type: 'POST',
                    url: 'https://griddata.herokuapp.com/materials/',
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