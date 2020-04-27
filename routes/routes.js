const { Router } = require("express");
const router = Router();

/*
 * Validator is walidates the express-validator errors.
 * need call after express-validation middlewares
 */
const validator = require('../utils/validator');

//Controllers
const userController = require('../controllers/userController');
const hotelController = require('../controllers/hotelController');
const bookController = require('../controllers/bookController');

//Validators
const userValidation = require('../validations/user');
const authValidation = require('../validations/auth');

//Middlewares
const authMiddleware = require('../middlewares/auth');

require("dotenv").config();
const _entryPoint = process.env.APP_ENTRYPOINT;

/**
 * ROUTES STARTS
 * 
 * RESTFul API BASICS
 * -----------------------------
 * Create — POST
 * Read/Retrieve — GET
 * Update — PUT/PATCH
 * Delete — DELETE
 */

//INDEX
router.all(_entryPoint, (req, res) => {
    res.send('Nothing here.');
});

//USER
router.post(_entryPoint + 'user/register', [userValidation.register], userController.createUser);
router.post(_entryPoint + 'user/login', [authValidation.login, validator], userController.loginUser);
router.put(_entryPoint + 'user/update', [authMiddleware, userValidation.update, validator], userController.updateUser);

//HOTEL
router.get(_entryPoint + 'hotel/getAll', hotelController.getAll);
router.get(_entryPoint + 'hotel/getHotelsByName/:name', hotelController.getHotelsByName);
router.post(_entryPoint + 'hotel/create', [authMiddleware], hotelController.create);

//BOOK
router.get(_entryPoint + 'book/getAll', bookController.getAll);
router.post(_entryPoint + 'book/create', bookController.create);
router.put(_entryPoint + 'book/update', bookController.update);

module.exports = router;