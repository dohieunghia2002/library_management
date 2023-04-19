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

    // [GET] /admin/users/:id/edit
    edit(req, res, next) {
        User.findById(req.params.id)
            .then(usr => {
                res.send(mongooseToObject(usr))
            })
            .catch(next);
    }

    // [PUT] /users/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({
                status: 200
            }))
            .catch(() => res.json({
                status: 500
            }));
    }

    // [DELETE] /users/:id
    destroy(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.send('DELETE SUCCESS!'))
            .catch(() => res.send('DELETE FAIL!'));
    }
}

module.exports = new UserController;