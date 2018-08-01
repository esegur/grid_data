const mongoose = require('mongoose');
const Table = require('../models/tables');

//exec turn it into real promise
exports.tables_get_all = (req, res) => {
    Table
    .find()
    .sort({_id: 1})
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.post_table = (req, res, next) => {
    
    const tables = new Table({
        _id: new mongoose.Types.ObjectId(),
        tableName: req.body.tableName,
        description: req.body.description,
        types: req.body.types,                        
    });
    tables.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created table successfully',
            createdTable: {
                _id: result._id, 
                tableName: result.tableName,
                description: result.description,
                types: result.types,               
                request: {
                    type: 'GET',
                    url: "https://griddata.herokuapp.com/tables/" + result._id
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

exports.patch_table = (req, res, next) => {
    const id = req.params.tableId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Table.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Table updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/tables/' + id
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

exports.get_table_by_id = (req, res, next) => {
    Table.findById(req.params.tableId)
        .then(table => {
            if (!table) {
                return res.status(404).json({
                    message: "Table not found"
                });
            }
            res.status(200).json({
                table: table,
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/tables'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.put_table = (req, res, next) => {
    Table.findById(req.params.id, function (err, table){
        if(!table) {
            return res.status(404).send('No se ha encontrado la tabla');
        } else {
            table.tableName = req.body.tableName;
            table.types = req.body.types;
            table.description = req.body.description;
            table.save()
            .then(table => {
                res.status(200).json('Tabla Actualizada completamente');
            })
            .catch(err => {
                res.status(400).send('Se ha producido un error al actualizar los datos de la tabla');
            });
        }
    })
}