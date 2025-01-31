"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
        

    }
  }

  spots.init(
    {
      ownerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.VARCHAR[50],
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.VARCHAR[50],
        allowNull: false,
        unique: false,
      },
      state: {
        type: DataTypes.VARCHAR[14],
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.VARCHAR[50],
        allowNull: false,
        unique: true,
      },
      lat: {
        type: DataTypes.DECIMAL[9, 6],
        allowNull: false,
        unique: true,
      },
      lng: {
        type: DataTypes.DECIMAL[9, 6],
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.VARCHAR[30],
        allowNull: false,
      },
      description: {
        type: DataTypes.VARCHAR["204"],
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL[7,2], 
        allowNull:false,
      },
      createdAt: {
        type: DataTypes.TIMESTAMP,
        allowNull:false,
        defaultValue: sequelize.literal("current_timestamp"),
      },
      updatedAt: {
        type: DataTypes.TIMESTAMP,
        allowNull:false,
        defaultValue: sequelize.literal("current_timestamp"),
      },
    },
    {
      sequelize,
      modelName: "spots",
    }
  );
  return Spot;
};
