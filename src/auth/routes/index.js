const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/index');
const validationHandler = require('../../middlewares/validationHandler');
const { authValidation } = require('../../utills/validationConfig');

const authRouter = express.Router();

authRouter.post('/login', ...validationHandler(authValidation, 'login'), authController.postLogin);

authRouter.post('/registration', ...validationHandler(authValidation, 'registration'), authController.postRegistration);

module.exports = authRouter;
