"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
        Spot.belongsTo(models.User,{
          foreignKey:"ownerId",
        });
         Spot.hasMany(models.Review, {
         foreignKey: "spotId"
         });
         Spot.hasMany(models.Booking, {
           foreignKey: "spotId"
         });
         Spot.hasMany(models.SpotImage, {
           foreignKey: "spotId"
         });
    }
  } //delete on cascade

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: "Users",
        },
        onDelete: "CASCADE"
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: true,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL, 
        allowNull:false,
      },
      
    },
    {
      sequelize,
      modelName: "Spot",
      
   }
  );
  return Spot;
};
