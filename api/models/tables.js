const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tableName: { type: String},
    description: [],
    types: []
},{
    collection: 'tables'
});

module.exports = mongoose.model('Table', tableSchema);