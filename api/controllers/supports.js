const Support = require('../models/supports');
const Material = require('../models/materials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.supports_get_all = (req, res, next) => {
    Support.find()
    .sort({_id:-1})
    .select('_id root support supportDescription supportType supportTypeDescription storage storageDescription material chapters updateDate')
    .populate('material')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            supports:docs.map(doc => {
                return {
                    _id: doc._id,
                    root: doc.root,
                    support: doc.support,
                    supportDescription: doc.supportDescription,
                    supportType: doc.supportType,
                    supportTypeDescription: doc.supportTypeDescription,
                    storage: doc.storage,
                    storageDescription: doc.storageDescription,
                    material: doc.material,
                    chapters: doc.chapters,
                    updateDate: doc.updateDate,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/supports/' + doc._id
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

exports.post_support = (req, res, next) => {
  Material.findById(req.body.materialId)
    .then(material => {
        const support = new Support({
            _id: mongoose.Types.ObjectId(),
            root: req.body.root,
            support: req.body.support,
            supportDescription: req.body.supportDescription,
            supportType: req.body.supportType,
            supportTypeDescription: req.body.supportTypeDescription,
            storage: req.body.storage,
            storageDescription: req.body.storageDescription,
            material: req.body.material,
            chapters: req.body.chapters,
            updateDate: req.body.updateDate,
        });
         return support.save()
         .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Support stored',
                createdSupport: {
                    _id: result._id,
                    root: result.root,
                    support: result.support,
                    supportDescription: result.supportDescription,
                    supportType: result.supportType,
                    supportTypeDescription: result.supportTypeDescription,
                    storage: result.storage,
                    storageDescription: result.storageDescription,
                    material: result.material,
                    chapters: result.chapters,
                    updateDate: result.updateDate,
                },
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/supports/' + result._id
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

exports.get_support_by_id = (req, res, next) => {
    Support.findById(req.params.supportId)
        .populate('material')
        .exec()
        .then(support => {
            if (!support) {
                return res.status(404).json({
                    message: "Support not found"
                });
            }
            res.status(200).json({
                support: support,
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/supports'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.patch_support = (req, res, next) => {
    const id = req.params.supportId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Support.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Support updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/supports/' + id
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

exports.delete_support = (req, res, next) => {
    Support.remove({ _id: req.params.supportId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Support deleted',
                request: {
                    type: "POST",
                    url: "https://griddata.herokuapp.com/supports"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}