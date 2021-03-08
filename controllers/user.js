const TAG = "controllers.user";
// const mongoose = require('mongoose');
const UserModel = require("../models/User");

exports.create = (req, res) => {
    const tag = TAG + ".create";
    logger(tag, req.body);

    // let INSERT_DOC = {
    //     name: req.body.name,
    //     email: req.body.advertiser,
    //     password: req.body.password,
    //     by: req.user._id
    // };

    UserModel.create(req.body).then((doc) => {
        res.status(200).json({
            success: true,
            result: doc
        });
    }).catch((err) => {
        res.status(403).json({
            messages: err
        })
    });
}