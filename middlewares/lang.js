const fs = require("fs");
const util = require('util');

const _LANG_DIR = './languages';

require("dotenv").config();

const readFilePromise = util.promisify(fs.readFile);

async function initJson(file) {
    try {
        return await new Promise((resolve, reject) => {
            readFilePromise(file, 'utf8', (error, data) => {
                if (error) reject(error);
                resolve(JSON.parse(data));
            });
        });
    } catch (e) {
        reject(e);
    }
};

module.exports = (req, res, next) => {
    try {

        let lang = req.body.language ? req.body.language : process.env.DEFAULT_LANG;

        initJson(_LANG_DIR + '/' + lang + '.json').then(data => {
            req.lang = data;
            return next();
        }).catch(err => {
            return res.status(500).send('Language:Error can not parse language file');
        });

    } catch (e) {
        return res.status(500).send(e);
    }
}