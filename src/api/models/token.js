'use strict';
const { Model } = require('sequelize');
const { tokenType } = require('../../config/constants');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });
    }
  }
  Token.init(
    {
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM(
          tokenType.ACCESS,
          tokenType.REFRESH,
          tokenType.JWT,
          tokenType.EMAIL_VERIFICATION,
          tokenType.PASSWORD_RESET
        ),
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );
  return Token;
};
