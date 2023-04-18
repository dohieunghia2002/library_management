const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, maxLength: 8, required: true, unique: true },
    password: { type: String, maxLength: 10, required: true},
    name: { type: String, maxLength: 50 },
    gender: { type: String, enum: ['Nam', 'Nữ'], default: 'Nam'},
    position: { type: String, enum: ['Thủ thư', 'Học sinh'], required: true}
}, { collection: 'users' });

//this method generates an auth token for the user
// userSchema.pre('save', async function(next) {
//     const user = this;
//     if (user.isModified('password')) {
//       user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
