const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { jwtConfig } = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        targetKey: 'id',
      });
      this.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        as: 'tokens',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty',
          },
          notNull: {
            args: true,
            msg: 'Name cannot be null',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty',
          },
          notNull: {
            args: true,
            msg: 'Username cannot be null',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, jwtConfig.saltRound);
      user.password = hashedPassword;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, jwtConfig.saltRound);
      user.password = hashedPassword;
    }
  });

  return User;
};
