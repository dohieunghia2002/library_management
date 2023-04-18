const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongoose.util');

class UserController {
    // [GET] /admin/users/
    async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.json({ users, status: 200 });
        } catch (error) {
            res.json({error, status: 500});
        }
    }
}

module.exports = new UserController;