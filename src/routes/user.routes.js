const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/userValidation');
const { userController } = require('../api/controllers');
const router = express.Router();

router.get('/', validate(userValidation.getUsers), userController.getUsers);
router.get('/:userId', validate(userValidation.getUser), userController.getUser);
router.put('/:userId', validate(userValidation.updateUser), userController.updateUser);
router.delete('/:userId', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
