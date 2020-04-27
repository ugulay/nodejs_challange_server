const bcrypt = require("bcrypt");
const moment = require("moment");
const crypto = require('crypto');

require("dotenv").config();

module.exports.setPassword = (val) => {
    return bcrypt.hashSync(val, 10);
}

module.exports.comparePassword = (pass1, pass2) => {
    return bcrypt.compareSync(pass1, pass2);
}

module.exports.randomString = (length) => {
    return crypto.randomBytes(length).toString('hex');
}

module.exports.newTicket = () => {
    return process.env.TICKET_PREFIX + moment.now() + '-' + this.randomString(2);
}