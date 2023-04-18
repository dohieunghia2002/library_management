const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const Book = new Schema({
    ID: {type: String, maxLength: 10, required: true, unique: true },
    name: { type: String, maxLength: 100, required: true },
    description: { type: String},
    quantity: { type: Number },
    image: { type: String, maxLength: 200 },
    author: { type: String, maxLength: 100},
    slug: { type: String, unique: true },
}, {collection: 'books'});

Book.pre('save', function(next) {
    this.name = this.name.replace(
        /[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi,
        ''
    );
    this.slug = slugify(this.name, {lower: true});
    next();
});

module.exports = mongoose.model('Book', Book);
