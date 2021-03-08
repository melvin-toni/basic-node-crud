const env = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const chalk = require('chalk');
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