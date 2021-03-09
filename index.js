const env = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const chalk = require('chalk');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

// add the list of routes here
const userRoutes = require('./routes/user');

let envPath = 'environments/.env.development'
if (process.env.NODE_ENV === 'production') {
    envPath = 'environments/.env.production';
}
env.config({
    debug: process.env.DEBUG,
    path: envPath
})

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((info) => {
    // logger(TAG, chalk.green('✓') + ' MongoDB connection Established');
    console.log('MongoDB connection Established');
}).catch((error) => {
    // logger(TAG, chalk.red('✘') + ' MongoDB connection error ' + error.message);
    console.log('MongoDB connection error');
});

// await mongoose.connect(process.env.MONGODB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

const app = express();
app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

// app.use(expressValidator());

// add the list of API's here
app.use('/api/user', userRoutes);

if (process.env.DEBUG) {
    app.use(errorHandler());
}

app.listen(app.get('port'), () => {
    console.log('%s App is running at %s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
});

module.exports = app;