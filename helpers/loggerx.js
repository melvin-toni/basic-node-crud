const logger = (TAG, log)=> {
    process.env.DEBUG && console.log('%s %s', TAG, log);
};

module.exports = logger;