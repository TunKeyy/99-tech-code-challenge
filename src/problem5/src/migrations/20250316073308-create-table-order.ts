import { StatusCode } from "@code-challenge/models";
import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    console.log("get here");
    await queryInterface.sequelize.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";");
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: StatusCode.Active,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      customerPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalBeforeVat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      vatInfo: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      totalAfterVat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable("orders");
  }
};