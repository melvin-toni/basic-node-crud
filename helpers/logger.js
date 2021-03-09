const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require("./config");
const logger = require("./loggerx");
const mongoose = require('mongoose');

const RSA_PUBLIC_KEY = fs.readFileSync('jwtRS256.key.pub', 'utf8');
const RSA_PRIVATE_KEY = fs.readFileSync('jwtRS256.key', 'utf8');
const passphrase = process.env.SECRET_KEY;

const BillboardSettingModel = require("../models/BillboardSetting");
const BrandModel = require("../models/Brand");
const ProductModel = require("../models/Product");
const CampaignModel = require("../models/Campaign");
const BillboardPanelModel = require("../models/BillboardPanel");
const BillboardLocationModel = require("../models/BillboardLocation");
const BillboardMediaModel = require("../models/BillboardMedia");
const BillboardRatecardStaticModel = require("../models/BillboardRatecardStatic");
const BillboardRatecardDigitalModel = require("../models/BillboardRatecardDigital");
const AdminModel = require("../models/Admin");
const FieldAssistantModel = require("../models/FieldAssistant");
const NotificationModel = require('../models/Notification');
const messages = require('./messages');
const AgencyCompanyBilling = require('../models/AgencyCompanyBilling');

const logger = (TAG, log) => {
    process.env.DEBUG && console.log('%s %s', TAG, log);
};

exports.success = (req, res, tag, result, message) => {
    logger(chalk.green("success"), req.originalUrl);
    logger("tag", tag);
    // logger("result", JSON.stringify(result));

    res.status(config.statusCode.OK)
        .json({
            success: true,
            message: message,
            result: result
        });
}

exports.failed = (req, res, tag, status, message, error) => {
    let statusCode = status ? status : config.statusCode.INTERNAL_SERVER_ERROR;
    let _message = message ? message : messages.general.tryAgain;
    let _error = error ? error : "";
    if (error && error.errorType && error.errorType === config.generalError) {
        statusCode = error.status ? error.status : config.statusCode.INTERNAL_SERVER_ERROR;
        _message = error.message ? error.message : messages.general.tryAgain;
        _error = error.error ? error.error : "";
    }
    logger(chalk.red("failed"), req.originalUrl);
    logger("tag", tag);
    logger("status", statusCode);
    logger("error", typeof _message !== 'String' ? JSON.stringify(_message) : _message);
    console.log("ERROR FAILED =>", (error ? error : 'something definitely wrong'));

    res.status(statusCode)
        .json({
            success: false,
            message: _message,
            error: _error
        });
}
