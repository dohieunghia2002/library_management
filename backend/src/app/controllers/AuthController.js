const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongoose.util');

class AuthController {
    // [POST] /admin/auth/register
    registerNewUser(req, res, next) {
        const formData = req.body;
        const user = new User(formData);
        user.save()
            .then(() => res.json({
                status: 200
            }))
            .catch(() => res.json({
                status: 500
            }));
    }

    // [POST] /auth/login
    async loginUser(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            
            const user = await User.findOne({username})
            if(!user) {
                res.json({ message: 'Wrong username', status: 404 });
            }

            const validPassword = await password === user.password;
            if(!validPassword) {
                res.json({ message: 'Wrong password', status: 404 });
            }

            if(user && validPassword) {
                res.json({ user, status: 200 });
            }
        } catch (error) {
            res.json(err)
        }
    }
}

module.exports = new AuthController;