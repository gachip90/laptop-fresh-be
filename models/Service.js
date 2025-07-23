const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  features: {
    type: DataTypes.JSON,
    defaultValue: [
      "Nâng cấp RAM 8GB/16GB/32GB",
      "Thay SSD 256GB/512GB/1TB",
      "Tư vấn cấu hình phù hợp",
      "Kiểm tra tương thích",
      "Bảo hành linh kiện 12 tháng",
    ],
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  tableName: "Services",
  timestamps: true,
},
);

module.exports = Service;