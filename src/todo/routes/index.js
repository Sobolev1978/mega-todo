const express = require('express');
const getTasks = require('../controllers/getTasks');
const addTask = require('../controllers/addTask');
const deleteTask = require('../controllers/deleteTask');
const patchTask = require('../controllers/patchTask');
const deleteAllCompleted = require('../controllers/deleteAllCompleted');
const completeAllTasks = require('../controllers/completeAllTasks');
const tokenHandler = require('../../middlewares/tokenHandler');
const validationHandler = require('../../middlewares/validationHandler');
const { accessTaskValidation, addTaskValidation } = require('../../utills/validationConfig');

const router = express.Router();

router.get('/', tokenHandler, getTasks);
router.post('/', ...validationHandler(addTaskValidation, 'addTask'), tokenHandler, addTask);
router.delete('/', ...validationHandler(accessTaskValidation, 'addTask'), tokenHandler, deleteTask);
router.patch('/', ...validationHandler(accessTaskValidation, 'addTask'), tokenHandler, patchTask);
router.delete('/completed', tokenHandler, deleteAllCompleted);
router.patch('/completed', tokenHandler, completeAllTasks);

module.exports = router;
