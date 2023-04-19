const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const bookController = require('../app/controllers/BookController');
const userController = require('../app/controllers/UserController');
const authController = require('../app/controllers/AuthController');

router.get('/stored/books', adminController.storedBooks);

router.post('/books/store', bookController.store);

router.post('/auth/register', authController.registerNewUser);

router.get('/users', userController.getAllUser);

router.get('/books/:id/edit', bookController.edit);

router.get('/users/:id/edit', userController.edit);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.destroy);

module.exports = router;