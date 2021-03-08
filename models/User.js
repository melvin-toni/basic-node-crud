const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const messages = require("../helpers/messages");
// const config = require('../helpers/config');

const SCHEMA = new mongoose.Schema({
    token: String,
    name: String,
    email: { type: String, trim: true, unique: true },
    password: String,
    by: Schema.Types.ObjectId,
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true })

// If account with phone, email AND password is exists, then cancel create operation
// SCHEMA.pre('save', function (next) {
//     const AD = mongoose.model('Admin', SCHEMA);
//     let CHECK_DOC = {
//         // phone: this.phone,
//         email: this.email,
//         // password: this.password
//     };

//     AD.find(CHECK_DOC).then((doc) => {
//         if (doc.length > 0) {
//             next({ errorType: config.generalError, status: config.statusCode.BAD_REQUEST, message: messages.admin.duplicateAdminData });
//         } else {
//             next();
//         }
//     }).catch((error) => next({ errorType: config.generalError, message: 'Find Admin failed', error: error }));
// });

// If account with email is exists, then cancel update operation
// SCHEMA.post('findOneAndUpdate', function (error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next({ errorType: config.generalError, status: config.statusCode.BAD_REQUEST, message: messages.admin.duplicateAdminData, error: error });
//     } else {
//         next();
//     }
// })

module.exports = mongoose.model('User', SCHEMA);