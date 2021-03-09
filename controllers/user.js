const TAG = "controllers.user";
// const mongoose = require('mongoose');
// const logger = require("../helpers/loggerx");
const UserModel = require("../models/User");

exports.create = (req, res) => {
    const tag = TAG + ".create";
    // logger(tag, req.body);

    // let INSERT_DOC = {
    //     name: req.body.name,
    //     email: req.body.advertiser,
    //     password: req.body.password,
    //     by: req.user._id
    // };

    UserModel.create(req.body).then((doc) => {
        // logger(chalk.green("success"), req.originalUrl);
        // logger("tag", tag);
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        // logger(chalk.green("failed"), req.originalUrl);
        // logger("tag", tag);
        console.log('USER CREATE FAILED', err);
        res.status(403).json({
            messages: err.messages
        })
    });
}

exports.readAll = (req, res) => {
    const tag = TAG + ".read all";
    // logger(tag, req.body);
    let _limit = parseInt(req.query.limit) ? parseInt(req.query.limit) * 1 : 10;
    let _skip = parseInt(req.query.index) ? parseInt(req.query.index) * _limit : 0;

    UserModel.find({}).then((doc) => {
        // logger(chalk.green("success"), req.originalUrl);
        // logger("tag", tag);
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        // logger(chalk.green("failed"), req.originalUrl);
        // logger("tag", tag);
        console.log('USER READ FAILED', err);
        res.status(403).json({
            messages: err.messages
        })
    });
}

exports.readOne = (req, res) => {
    const tag = TAG + ".read detail";
    // logger(tag, req.body);
    let _limit = parseInt(req.query.limit) ? parseInt(req.query.limit) * 1 : 10;
    let _skip = parseInt(req.query.index) ? parseInt(req.query.index) * _limit : 0;

    UserModel.findOne({'_id': req.params.id}).then((doc) => {
        // logger(chalk.green("success"), req.originalUrl);
        // logger("tag", tag);
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        // logger(chalk.green("failed"), req.originalUrl);
        // logger("tag", tag);
        console.log('USER READ FAILED', err);
        res.status(403).json({
            messages: err.messages
        })
    });
}

exports.update = (req, res) => {
    const tag = TAG + ".update";

    const query = { _id: req.params.id };

    let UPDATE_DOC = {};
    req.body.name ? (UPDATE_DOC['name'] = req.body.name) : '';
    req.body.email ? (UPDATE_DOC['email'] = req.body.email) : '';
    req.body.password ? (UPDATE_DOC['password'] = req.body.password) : '';
    
    const queryOptions = {
        new: true
    }
        
    UserModel.findOneAndUpdate(query, UPDATE_DOC, queryOptions).then((doc) => {

        // logger(chalk.green("success"), req.originalUrl);
        // logger("tag", tag);
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        // logger(chalk.green("failed"), req.originalUrl);
        // logger("tag", tag);
        console.log('USER UPDATE FAILED', err);
        res.status(403).json({
            messages: err.messages
        })
    });
}

exports.delete = (req, res) => {
    const tag = TAG + ".delete";

    const query = { _id: req.params.id };
    
    const queryOptions = {
        new: true
    }
        
    UserModel.findOneAndUpdate(query, {'is_deleted': true}, queryOptions).then((doc) => {

        // logger(chalk.green("success"), req.originalUrl);
        // logger("tag", tag);
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        // logger(chalk.green("failed"), req.originalUrl);
        // logger("tag", tag);
        console.log('USER DELETE FAILED', err);
        res.status(403).json({
            messages: err.messages
        })
    });
}