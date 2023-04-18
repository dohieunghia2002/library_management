const Book = require('../models/Book');
const { mongooseToObject } = require('../../utils/mongoose.util');

class BookController {
    // [GET] /books/:slug
    show(req, res, next) {
        Book.findOne({ slug: req.params.slug })
            .then(book => {
                res.send(mongooseToObject(book))
            })
            .catch(next);
    }

    // [POST] /admin/books/store
    store(req, res, next) {
        const formData = req.body;
        const book = new Book(formData);
        book.save()
            .then(() => res.json({
                status: 200
            }))
            .catch(() => res.json({
                status: 500
            }));
    }

    // [GET] /admin/books/:id/edit
    edit(req, res, next) {
        Book.findById(req.params.id)
            .then(book => {
                res.send(mongooseToObject(book))
            })
            .catch(next);
    }

    // [PUT] /books/:id
    update(req, res, next) {
        Book.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({
                status: 201
            }))
            .catch(() => res.json({
                status: 501
            }));
    }

    // [DELETE] /books/:id
    destroy(req, res, next) {
        Book.deleteOne({ _id: req.params.id })
            .then(() => res.send('DELETE SUCCESS!'))
            .catch(() => res.send('DELETE FAIL!'));
    }
}

module.exports = new BookController;