"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
        Spot.belongsToMany(models.User,{
          foreignKey:"ownerid",
          onDelete: "CASCADE"
        });
        //  Spot.belongsToMany(Review, {
        //  foreignKey: "spotid"
        //  });
        //  Spot.belongsToMany(Booking, {
        //    foreignKey: "spotid"
        //  });
        //  Spot.belongsToMany(Spotimage, {
        //    foreignKey: "spotid"
        //  });
    }
  } //delete on cascade

  Spot.init(
    {
      ownerId: {
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
        type: DataTypes.Decimal[9,6],
        allowNull: false,
        unique: true
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
      modelName: "Spot",
      tableName: "spots",
   }
  );
  return Spot;
};
