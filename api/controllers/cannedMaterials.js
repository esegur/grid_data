const Contract = require('../models/contracts');
const CannedMaterial = require('../models/cannedMaterials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.cannedMaterials_get_all = (req, res, next) => {
    CannedMaterial
    .find()
    .sort({_id:-1})
    .select('_id originalTitle ownTitle listTitle codMaterial materialType validities windowsDates costCenter checkedSignals numChapters duration contract')
     .populate('contract')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                cannedMaterials: docs.map(doc => {
                    return {
                        _id: doc._id,
                        originalTitle: doc.originalTitle,
                        ownTitle: doc.ownTitle,
                        listTitle: doc.listTitle,
                        codMaterial: doc.codMaterial,
                        materialType: doc.materialType,
                        validities: doc.validities,
                        windowsDates: doc.windowsDates,
                        costCenter: doc.costCenter,
                        checkedSignals: doc.checkedSignals,
                        numChapters: doc.numChapters,
                        duration: doc.duration,
                        contract:doc.contract,
                        request: {
                            type: 'GET',
                            url: 'https://griddata.herokuapp.com/cannedMaterials/' + doc._id
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

exports.post_new_cannedMaterial = (req, res, next) => {
    
    const cannedMaterial = new CannedMaterial({
        _id: new mongoose.Types.ObjectId(),
        originalTitle: req.body.originalTitle,
        ownTitle: req.body.ownTitle,
        listTitle: req.body.listTitle,
        codMaterial: req.body.codMaterial,
        materialType: req.body.materialType,
        validities: req.body.validities,
        windowsDates: req.body.windowsDates,
        costCenter: req.body.costCenter,
        checkedSignals: req.body.checkedSignals,
        numChapters: req.body.numChapters,
        duration: req.body.duration,
        contract: req.body.contract,
    });
    cannedMaterial.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created canned material successfully',
            createdCannedMaterial: {
                _id: result._id,
                originalTitle: result.originalTitle,
                originalTitle: result.originalTitle,
                ownTitle: result.ownTitle,
                listTitle: result.listTitle,
                codMaterial: result.codMaterial,
                materialType: result.materialType,
                validities: result.validities,
                windowsDates: result.windowsDates,
                costCenter: result.costCenter,
                checkedSignals: result.checkedSignals,
                numChapters: result.numChapters,
                duration: result.duration,
                contract: result.contract,    
                request: {
                    type: 'GET',
                    url: "https://griddata.herokuapp.com/cannedMaterials/" + result._id
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

// exports.put_material = (req, res, next) => {
//     Material.findById(req.params.materialId, function (err, material){
//         if(!material) {
//             return res.status(404).send('No se ha encontrado el material');
//         } else {
//             material.originalTitle = req.body.originalTitle,
//             material.ownTitle = req.body.ownTitle,
//             material.listTitle = req.body.listTitle,
//             material.codMaterial = req.body.codMaterial,
//             material.codProgram = req.body.codProgram,
//             material.materialType = req.body.materialType,
//             material.classification = req.body.classification,
//             material.numClassification = req.body.numClassification,
//             material.broadcastPrice = req.body.broadcastPrice,
//             material.broadcastCredit = req.body.broadcastCredit,
//             material.mainActors = req.body.mainActors,
//             material.secondaryActors = req.body.secondaryActors,
//             material.validity = req.body.validity,
//             material.costCenter = req.body.costCenter,
//             material.numCenter = req.body.numCenter,
//             material.genre = req.body.genre,
//             material.director = req.body.director,
//             material.allMusicalThemes = req.body.allMusicalThemes,
//             material.hoursMaterial = req.body.hoursMaterial,
//             material.minutesMaterial = req.body.minutesMaterial,
//             material.minTimeTheme = req.body.minTimeTheme,
//             material.secTimeTheme = req.body.secTimeTheme,
//             material.checkedSignals = req.body.checkedSignals,
//             material.numChapters = req.body.numChapters,
//             material.uploadDate = req.body.uploadDate,
//             material.updateDate = req.body.updateDate,
//             material.supportsRelated = req.body.supportsRelated,
//             material.videoCutting = req.body.videoCutting,
//             material.cutAllChapters = req.body.cutAllChapters,
//             material.rankChapters = req.body.rankChapters,
//             material.individualEntryOfChapters = req.body.individualEntryOfChapters,
//             material.productionCompany = req.body.productionCompany,
//             material.netDuration = req.body.netDuration,
//             material.newNetDuration = req.body.newNetDuration,
//             material.status = req.body.status,
//             material.canned = req.body.canned,                 

//             material.save()
//             .then(material => {
//                 res.status(200).json('Material Actualizado completamente');
//             })
//             .catch(err => {
//                 res.status(400).send('Se ha producido un error al actualizar los datos del material');
//             });
//         }
//     })
// }

// exports.get_material_by_id = (req, res, next) => {
//     const id = req.params.materialId;
//     Material.findById(id)
//         .populate('supportsRelated')
//         .select('originalTitle newNetDuration ownTitle listTitle _id codMaterial codProgram materialType productionCompany netDuration classification cutAllChapters rankChapters individualEntryOfChapters supportsRelated videoCutting numClassification broadcastPrice broadcastCredit mainActors secondaryActors validity costCenter numCenter genre director allMusicalThemes hoursMaterial minutesMaterial minTimeTheme secTimeTheme checkedSignals numChapters updateDate uploadDate status canned')
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             if (doc) {
//                 res.status(200).json({
//                     material: doc,
//                     request: {
//                         type: 'GET',
//                         url: 'https://griddata.herokuapp.com/materials/'
//                     }
//                 });
//             } else {
//                 res.status(404).json({message: 'No valid entry found for provided ID'});
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({error: err});
//         });
// }

// exports.patch_material = (req, res, next) => {
//     const id = req.params.materialId;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Material.update({_id: id}, { $set: updateOps})
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({
//                 message: 'Material updated',
//                 request: {
//                     type: 'GET',
//                     url: 'https://griddata.herokuapp.com/materials/' + id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         })
// }

// exports.delete_material = (req, res, next) => {
//     const id = req.params.materialId;
//     Material.remove({_id: id})
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'Material deleted',
//                 request: {
//                     type: 'POST',
//                     url: 'https://griddata.herokuapp.com/materials/',
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// }