const chalk = require('chalk');

exports.traceLog = (TAG) => {
    process.env.DEBUG && console.log(chalk.blue(TAG));
}

exports.successLog = (req, res, obj) => {
    console.log(chalk.green("success"), req.method, req.originalUrl);

    res.status(200).json({
        success: (obj.status ? obj.status : true),
        message: (obj.message ? obj.message : 'Operation successful'),
        result: (obj.result ? obj.result : '')
    });
}

exports.failedLog = (req, res, obj) => {
    console.log(chalk.red("failed"), req.method, req.originalUrl);
    console.log(chalk.red(JSON.stringify(obj.debug)));
    res.status(400).json({
        success: (obj.status ? obj.status : false),
        message: (obj.message ? obj.message : 'Operation failed'),
        errResult: (obj.errResult ? obj.errResult : '')
    });
}