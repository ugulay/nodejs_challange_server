const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {

    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    next();

}