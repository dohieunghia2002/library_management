const Book = require('../models/Book');
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongoose.util');

class AdminController {
    // [GET] /admin/stored/books
    storedBooks(req, res, next) {      
        Book.find({})
            .then(books => {
                res.send({ books: multipleMongooseToObject(books) })
            })
            .catch(next);
    }

    
}

module.exports = new AdminController;