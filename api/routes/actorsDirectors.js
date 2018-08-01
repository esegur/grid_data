const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ActorsDirectors = require("../models/actorsDirectors");

router.get('/', (req, res, next) => {
    ActorsDirectors.find()
    .select('_id name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                actorsDirectors: docs.map(doc => {
                    return {
                        __id: doc._id,
                        name: doc.name,
                        request: {
                            type: 'GET',
                            url: 'https://griddata.herokuapp.com/actorsDirectors/' + doc._id
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
});


module.exports = router;