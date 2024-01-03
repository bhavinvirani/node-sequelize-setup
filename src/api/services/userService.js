const { Op } = require('sequelize');
const { User } = require('../models');
const CustomErrors = require('../../errors');
const pagination = require('../../utils/pagination');

const createUser = async (payload) => {
  return await User.create(payload);
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw CustomErrors.NotFoundError('User not found');
  }
  return user;
};

const getByEmail = async (email, isPasswordRequired = false) => {
  const queryOptions = {
    where: { email },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  };
  if (isPasswordRequired) {
    queryOptions.attributes.include = ['password'];
  }

  return await User.findOne(queryOptions);
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
      throw CustomErrors.BadRequestError('Email already taken');
    }
    user.email = payload.email;
  }
  await user.save();
  return user;
};

const deleteUser = async (userId) => {
  const user = await getById(userId);
  await user.destroy();
};

module.exports = {
  createUser,
  getById,
  getByEmail,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
