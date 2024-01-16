const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { userService } = require('../services');

const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await userService.getUsers(req.query);
  return successResponse(res, 200, users, 'Users Retrieved Successfully');
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.getUser(userId);
  return successResponse(res, 200, user, 'User Retrieved Successfully');
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.updateUser(userId, req.body);
  return successResponse(res, 200, user, 'User Updated Successfully');
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);
  return successResponse(res, 200, null, 'User Deleted Successfully');
});

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
