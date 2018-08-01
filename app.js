const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const materialRoutes = require('./api/routes/materials');
const cannedMaterialRoutes = require('./api/routes/cannedMaterials');
const allMaterialRoutes = require('./api/routes/allMaterials');
const programRoutes = require('./api/routes/programs');
const contractRoutes = require('./api/routes/contracts');
const gridRoutes = require('./api/routes/grid');
const segmentRoutes = require('./api/routes/segments');
const supportRoutes = require('./api/routes/supports');
const tableRoutes = require('./api/routes/tables');
const actorsDirectorsRoutes = require('./api/routes/actorsDirectors');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://america:'+ process.env.MONGO_ATLAS_PW +'@ds139920.mlab.com:39920/grid_data');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//We ensure we prevent cors errors and restrict the allow origin *
app.use(function (req, res ,next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET, PATCH,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next()
})


app.use('/materials', materialRoutes);
app.use('/cannedMaterials', cannedMaterialRoutes);
app.use('/allMaterials', allMaterialRoutes);
app.use('/programs', programRoutes);
app.use('/contracts', contractRoutes);
app.use('/grid', gridRoutes);
app.use('/segments', segmentRoutes);
app.use('/supports', supportRoutes);
app.use('/tables', tableRoutes);
app.use('/actorsDirectors', actorsDirectorsRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next ) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;