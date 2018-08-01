const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String,
             required: true,
             unique: true,
             match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            },
    password: { type: String, required: true }
},{
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);