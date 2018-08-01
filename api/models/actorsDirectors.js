const mongoose = require('mongoose');

const actorsDirectorsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String}
},{
    collection: 'actorsDirectors'
});

module.exports = mongoose.model('ActorsDirectors', actorsDirectorsSchema);