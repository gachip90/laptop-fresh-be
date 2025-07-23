const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2), 
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
      allowNull: true,
    },
    isBestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "Products", 
    timestamps: true, 
  }
);

module.exports = Product;