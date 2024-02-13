const { Op } = require('sequelize');
const { User, Role } = require('../models');
const CustomErrors = require('../../errors');
const pagination = require('../../utils/pagination');

// return boolean
const isUserExists = async (email) => {
  const count = await User.count({
    where: {
      email,
    },
  });

  return count > 0;
};
// return user with custom fields
const getById = async (id, requiredFields = null) => {
  const options = {};
  if (requiredFields) {
    options.attributes = ['id', ...requiredFields];
  }
  const user = await User.findByPk(id, options);
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const getByEmail = async (email, requiredFields) => {
  const queryOptions = {
    where: { email },
  };
  if (requiredFields) {
    queryOptions.attributes = ['id', 'email', ...requiredFields];
  }
  const user = await User.findOne(queryOptions);
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const getByPhone = async (phone, requiredFields = null) => {
  const queryOptions = {
    where: { phone },
  };
  if (requiredFields) {
    queryOptions.attributes = ['id','phone', ...requiredFields];
  }
  const user = await User.findOne(queryOptions);
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const createNewUser = async (payload) => {
  if (!payload.roleId) {
    const role = await Role.findOne({ where: { name: 'user' } });
    if (!role) {
      throw CustomErrors.NotFoundError('Role not found');
    }
    payload.roleId = role.id;
  }
  const user = await User.create(payload);
  return user;
};

const getUsers = async (payload) => {
  // const allowedSortFields = ['username', 'createdAt'];
  // const sortByField = allowedSortFields.includes(payload.sortBy)
  //   ? payload.sortBy
  //   : 'username';
  const { limit, offset } = pagination(payload.page, payload.limit);
  const users = await User.findAll({
    where: {
      username: {
        [Op.iLike]: `%${payload.search}%`,
      },
    },
    order: [[payload.sortBy, 'ASC']],
    limit,
    offset,
  });
  return users;
};

const getUser = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'email', 'username', 'createdAt'],
  });
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const updateUser = async (userId, payload) => {
  const user = await getById(userId);
  if (payload.name) {
    user.name = payload.name;
  }
  if (payload.email) {
    const userExists = await getByEmail(payload.email);
    if (userExists && userExists.dataValues.id != userId) {
      throw CustomErrors.BadRequestError('Email already in use');
    }
    user.email = payload.email;
  }
  await user.save();
  return user;
};

const updateUserPassword = async (userId, password) => {
  const user = await getById(userId);
  user.password = password;
  user.token = null;
  await user.save();
  return user;
};

const deleteUser = async (userId) => {
  const user = await getById(userId);
  await user.destroy();
};

module.exports = {
  isUserExists,
  createNewUser,
  getById,
  getByEmail,
  getByPhone,
  getUsers,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
