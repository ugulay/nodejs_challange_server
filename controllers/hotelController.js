const hotelModel = require("../models/hotel");

require("dotenv").config();

class HotelController {

    async getAll(req, res, next) {
        try {
            let all = await hotelModel.find({});
            res.status(200).json(all);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async create(req, res, next) {
        try {

            let hotelObj = new hotelModel({
                'title': req.body.title,
                'description': req.body.description,
                'location': req.body.location
            });

            let result = await hotelObj.save();

            res.json(result);

        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getHotelsByName(req, res, next) {
        try {
            let result = await hotelModel.findByName(req.params.name);
            res.json(result);
        } catch (e) {
            res.status(500).send(e);
        }
    }

}

module.exports = new HotelController();