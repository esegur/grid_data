const Grid = require('../models/grid');
const Program = require('../models/programs');
const Material = require('../models/materials');
const mongoose = require('mongoose');

//exec turn it into real promise
exports.grid_get_all = (req, res, next) => {
    Grid.find()
    .sort({_id:-1})
    .select('_id week programs')
    .populate('programs.refProgram programs.material programs.contract')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            grid:docs.map(doc => {
                return {
                    _id: doc._id,
                    week: doc.week,
                    programs: doc.programs,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/grid/' + doc._id
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

exports.post_grid = (req, res, next) => {
    Program.findById(req.body.programId)
      .then(program => {
          //if (!material) {
          //    return res.status(404).json({
          //        message: "Material not found"
          //    });
          //}
          const grid = new Grid({
              _id: mongoose.Types.ObjectId(),
              week: req.body.week,
              programs: req.body.programs
          });
           return grid.save()
           .then(result => {
              console.log(result);
              res.status(201).json({
                  message: 'Grid stored',
                  createdGrid: {
                      _id: result._id,
                      week: result.week,
                      programs: result.programs
                  },
                  request: {
                      type: 'GET',
                      url: 'https://griddata.herokuapp.com/grid/' + result._id
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

  exports.get_grid_by_id = (req, res, next) => {
    Grid.findById(req.params.gridId)
    .populate('programs.refProgram programs.material programs.contract')
        .exec()
        .then(grid => {
            if (!grid) {
                return res.status(404).json({
                    message: "Grid not found"
                });
            }
            res.status(200).json({
                grid: grid,
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/grid'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_gridProgram_by_gridId = (req, res, next) => {
    Grid.findById(req.params.gridId)
    .populate('programs.refProgram programs.material programs.contract')
        .exec()
        .then(grid => {
                let response = [];
                grid.programs.map((el,i,arr) => {
                    if(el.programGridTitle === req.params.gridProgram) {
                        response.push(el);
                    }
                })
                res.status(200).json({
                    count: response.length,
                    programsMatch: response,
                    request: {
                        type: 'GET',
                        url: 'https://griddata.herokuapp.com/grid'
                    }
                });
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_gridProgram_by_gridDate = (req, res, next) => {
    Grid.find()
    .sort({_id:-1})
    .select('_id week programs')
    .populate('programs.refProgram programs.material programs.contract')
    .exec()
    .then(docs => {
        let _id;
        let weekDate;
        let response = [];
        let grid;
        docs.map((el,i,arr) => {
          if(el.week === req.params.gridDate) {
              weekDate = el;
          }
        })
        
        if(weekDate !== undefined) {
            weekDate.programs.map((el,i,arr) => {
                if(el.programGridTitle === req.params.gridProgram) {
                    response.push(el);
                }
            })
            grid = weekDate;
            _id = weekDate._id;
        }  else {
            _id = "There is no id"
            grid = [];
            weekDate = { week:"Week not found" }
        }  
        res.status(200).json({
            count: response.length,
            _id: _id,
            weekDate: weekDate.week,
            gridMatch: response,
            fullGrid: grid
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
}

exports.get_gridWeek = (req, res, next) => {
    Grid.find()
    .sort({_id:-1})
    .select('_id week programs')
    .populate('programs.refProgram programs.material programs.contract')
    .exec()
    .then(docs => {
        let weekDate;
        docs.map((el,i,arr) => {
          if(el.week === req.params.gridWeek) {
              weekDate = el;
          } else {
            weekDate = "Week not found" 
          }
        })
              
        res.status(200).json({
            weekDate: weekDate
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
}

exports.patch_grid = (req, res, next) => {
    const id = req.params.gridId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Grid.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Grid updated',
                request: {
                    type: 'GET',
                    url: 'https://griddata.herokuapp.com/grid/' + id
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

