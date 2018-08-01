const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contractName: { type: String, required: false },
    contractCode: { type: String, required: false },
    providerCode: { type: String, required: false},
    registrationDate : { type: String, required: false},
    contractDate : { type: String, required: false},
    validity: { type: [], required: false},
    materialNumber: { type: String, required: false},
    totalAmount: { type: String, required: false},
    provideType: { type: String, required: false},
    proratedCheck: { type: Boolean, required: false},
    typeCurrency: { type: String, required: false},
    currencySymbol: { type: String, required: false},
    totalMaterials: { type: String, required: false},
    percent: { type: String, required: false},
    percentage: { type: String, required: false},
    percentageDisabled: { type: Boolean, required: false},
    contractFees: { type: [], required: false},
    totalAmountOffFees: { type: String, required: false},
    overallPass: { type: String, required: false},
    contador: { type: String, required: false},
    admittedMaterials: { type: [], required: false},
    isIndeterminate: { type: Boolean, required: false},
    checkedSignals: { type: [], required: false},
    confirmedStatus: { type: String, required: false},
    pendingStatus: { type: String, required: false},
    refMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: false }],
    canceledStatus: { type: String, required: false}
},{
    collection: 'contracts'
});

module.exports = mongoose.model('Contract', contractSchema);