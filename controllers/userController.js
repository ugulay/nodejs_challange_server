const jwt = require("jsonwebtoken");
const moment = require("moment");
const userModel = require("../models/user");
const functions = require("../utils/utils");

require("dotenv").config();

class UserController {

    async createUser(req, res, next) {

        try {

            let email = req.body.email;
            let password = req.body.password;

            if (await userModel.findOne({ 'email': email })) {
                return res.status(401).send('Username "' + email + '" is already taken');
            }

            let userObj = new userModel({ 'email': email, 'password': password });
            let result = await userObj.save();

            res.send(result);

        } catch (e) {
            res.status(500).send(e);
        }

    }

    async loginUser(req, res, next) {

        try {

            let email = req.body.email;
            let password = req.body.password;

            let payload;

            let getUser = await userModel.findOne({ 'email': email });

            if (getUser && getUser.status == false) {
                return res.status(401).json({ success: false, msg: 'Account not activated yet.' });
            }

            if (getUser && functions.comparePassword(password, getUser.password)) {
                payload = {
                    sub: getUser._id,
                    user: {
                        email: getUser.email,
                        role: getUser.role
                    },
                    exp: moment().add(2, 'hours').unix()
                }
                let token = await jwt.sign(payload, process.env.APP_SECRET);
                return res.status(200).json({ success: true, msg: 'Access Granted', 'token': token });
            }

            return res.status(401).send({ success: false, msg: 'Authorization failed.' });

        } catch (e) {
            console.log(e);
            return res.status(500).send({ success: false, msg: e });
        }

    }

    async updateUser(req, res, next) {

        try {

            let password = req.body.password;
            let newPassword = req.body.newPassword;

            let currentUserData = req.userData; //Comes from Auth Middleware

            let getUser = await userModel.findOne({ '_id': currentUserData.sub });

            if (getUser && functions.comparePassword(password, getUser.password)) {

                let updatePassword = await userModel.updateOne({ 'email': currentUserData.sub }, { 'password': newPassword });

                if (updatePassword) {
                    return res.status(200).json({ success: true, msg: 'Password Changed, next time to login use new password.' });
                }

                return res.status(500).json({ success: false, msg: 'Password not changed' });

            }

            return res.status(401).send({ success: false, msg: 'Authorization failed.' });

        } catch (e) {
            return res.status(500).send({ success: false, msg: 'Error' });
        }

    }

}

module.exports = new UserController();