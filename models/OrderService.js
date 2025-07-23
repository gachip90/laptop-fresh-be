const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User"); 

const OrderService = sequelize.define("OrderService", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: {
      model: "Users",
      key: "id",
    },
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderCode: {
    type: DataTypes.STRING,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  deviceInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
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
  note: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  status: {
    type: DataTypes.ENUM("canceled","pending", "confirmed", "completed"),
    defaultValue: "pending",
  },
  createdAt: {
    type: DataTypes.STRING,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  tableName: "OrderServices",
  timestamps: true,
  hooks: {
    beforeCreate: async (order, options) => {
      const lastOrder = await OrderService.findOne({
        order: [['orderCode', 'DESC']],
      });

      let nextNumber = 1; 
      if (lastOrder && lastOrder.orderCode) {
        
        const lastNumber = parseInt(lastOrder.orderCode.replace("MA", ""), 10);
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      order.orderCode = `MA${nextNumber.toString().padStart(3, "0")}`;
    },
  },
});

OrderService.belongsTo(User, { foreignKey: "userId", as: "user" });


module.exports = OrderService;