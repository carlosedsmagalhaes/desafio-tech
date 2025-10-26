import { Sequelize } from "sequelize";
import db from "../db.js";
import client from "./client.js";

const sale = db.define("sale", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  client_id: {
    type: Sequelize.INTEGER,
    references: {
      model: client,
      key: "id",
    },
  },
});

sale.belongsTo(client, { foreignKey: "client_id" });
client.hasMany(sale, { foreignKey: "client_id" });

export default sale;
