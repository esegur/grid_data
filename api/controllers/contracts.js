const Contract = require('../models/contracts')
const Material = require('../models/materials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.contracts_get_all = (req, res, next) => {
    Contract.find()
    .sort({_id:-1})
    .populate('refMaterials')
    .select('_id contractName providerCode refMaterials registrationDate contractCode contractDate validity materialNumber totalAmount provideType  proratedCheck typeCurrency currencySymbol totalMaterials percent percentage percentageDisabled contractFees totalAmountOffFees overallPass contador admittedMaterials isIndeterminate checkedSignals confirmedStatus pendingStatus canceledStatus')
    // .populate('crushedPrograms replacementPrograms')      
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            contracts:docs.map(doc => {
                return {
                    _id: doc._id,
                    contractName: doc.contractName,
                    contractCode: doc.contractCode,
                    providerCode: doc.providerCode,
                    registrationDate : doc.registrationDate,
                    contractDate : doc.contractDate,
                    validity: doc.validity,
                    materialNumber: doc.materialNumber,
                    totalAmount: doc.totalAmount,
                    provideType: doc.provideType,
                    proratedCheck: doc.proratedCheck,
                    typeCurrency: doc.typeCurrency,
                    currencySymbol: doc.currencySymbol,
                    totalMaterials: doc.totalMaterials,
                    percent: doc.percent,
                    percentage: doc.percentage,
                    percentageDisabled: doc.percentageDisabled,
                    contractFees: doc.contractFees,
                    totalAmountOffFees: doc.totalAmountOffFees,
                    overallPass: doc.overallPass,
                    contador: doc.contador,
                    admittedMaterials: doc.admittedMaterials,
                    isIndeterminate: doc.isIndeterminate,
                    checkedSignals: doc.checkedSignals,
                    confirmedStatus: doc.confirmedStatus,
                    pendingStatus: doc.pendingStatus,
                    canceledStatus: doc.canceledStatus,  
                    refMaterials: doc.refMaterials,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/contracts/' + doc._id
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

exports.post_contract = (req, res, next) => {
  Material.findById(req.body.materialId)
    .then(material => {
        //if (!material) {
        //    return res.status(404).json({
        //        message: "Material not found"
        //    });
        
        //}
        const contract = new Contract({
            _id: mongoose.Types.ObjectId(),
            contractName: req.body.contractName,
            contractCode: req.body.contractCode,
            providerCode: req.body.providerCode,
            registrationDate : req.body.registrationDate,
            contractDate : req.body.contractDate,
            validity: req.body.validity,
            materialNumber: req.body.materialNumber,
            totalAmount: req.body.totalAmount,
            provideType: req.body.provideType,
            proratedCheck: req.body.proratedCheck,
            typeCurrency: req.body.typeCurrency,
            currencySymbol: req.body.currencySymbol,
            totalMaterials: req.body.totalMaterials,
            percent: req.body.percent,
            percentage: req.body.percentage,
            percentageDisabled: req.body.percentageDisabled,
            contractFees: req.body.contractFees,
            totalAmountOffFees: req.body.totalAmountOffFees,
            overallPass: req.body.overallPass,
            contador: req.body.contador,
            admittedMaterials: req.body.admittedMaterials,
            isIndeterminate: req.body.isIndeterminate,
            checkedSignals: req.body.checkedSignals,
            confirmedStatus: req.body.confirmedStatus,
            pendingStatus: req.body.pendingStatus,
            refMaterials: req.body.refMaterials,
            canceledStatus: req.body.canceledStatus
        });
         return contract.save()
         .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Contract stored',
                createdContract: {
                    _id: result._id,
                    contractName: result.contractName,
                    contractCode: result.contractCode,
                    providerCode: result.providerCode,
                    registrationDate : result.registrationDate,
                    contractDate : result.contractDate,
                    validity: result.validity,
                    materialNumber: result.materialNumber,
                    totalAmount: result.totalAmount, 
                    provideType: result.provideType,
                    proratedCheck: result.proratedCheck,
                    typeCurrency: result.typeCurrency,
                    currencySymbol: result.currencySymbol,
                    totalMaterials: result.totalMaterials,
                    percent: result.percent,
                    percentage: result.percentage,
                    percentageDisabled: result.percentageDisabled,
                    contractFees: result.contractFees,
                    totalAmountOffFees: result.totalAmountOffFees,
                    overallPass: result.overallPass,
                    contador: result.contador,
                    admittedMaterials: result.admittedMaterials,
                    isIndeterminate: result.isIndeterminate,
                    checkedSignals: result.checkedSignals,
                    confirmedStatus: result.confirmedStatus,
                    pendingStatus: result.pendingStatus,
                    refMaterials: result.refMaterials,
                    canceledStatus: result.canceledStatus,         
                },
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/contracts/' + result._id
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

exports.get_contract_by_id = (req, res, next) => {
    Contract.findById(req.params.contractId)
        .populate('refMaterials')
        .exec()
        .then(contract => {
            if (!contract) {
                return res.status(404).json({
                    message: "Contract not found"
                });
            }
            res.status(200).json({
                contract: contract,
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/contract'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.patch_contract = (req, res, next) => {
    const id = req.params.contractId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Contract.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Contrac updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/contracts/' + id
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

exports.delete_contract = (req, res, next) => {
    Contract.remove({ _id: req.params.contractId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contract deleted',
                request: {
                    type: "POST",
                    url: "https://griddata.herokuapp.com/contracts"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}