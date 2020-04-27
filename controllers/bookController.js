const bookModel = require("../models/book");

require("dotenv").config();

class BookController {

    async getAll(req, res, next) {
        try {
            let all = await bookModel.find().populate('hotel');
            res.status(200).json(all);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async create(req, res, next) {
        try {

            let bookObj = new bookModel({
                'hotel': req.body.hotel,
                'date_start': req.body.date_start,
                'date_end': req.body.date_end,
                'room': req.body.room,
                'persons': req.body.persons,
                'contact': req.body.contact
            });

            let result = await bookObj.save();

            res.json(result);

        } catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res, next) {
        try {

            let getBook = await bookModel.findOne({ '_id': req.body.data._id });

            if (getBook) {

                let updateBook = await bookModel.updateOne({
                    '_id': req.body.data._id
                }, {
                    'status': req.body.newData.status,
                });

                if (updateBook) {
                    return res.status(200).json({ success: true, msg: 'Book updated.' });
                }

                return res.status(500).json({ success: false, msg: 'Error : Book not updated' });

            } else {

                return res.status(404).json({ success: false, msg: 'Book not found' });

            }

        } catch (e) {
            res.status(500).send(e);
        }
    }

}

module.exports = new BookController();