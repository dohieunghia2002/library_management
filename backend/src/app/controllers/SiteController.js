const Book = require('../models/Book');
const { multipleMongooseToObject } = require('../../utils/mongoose.util');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Book.find({})
            .then(books => {
                res.send({books: multipleMongooseToObject(books)});
            })
            .catch(next)
    }
}

module.exports = new SiteController;