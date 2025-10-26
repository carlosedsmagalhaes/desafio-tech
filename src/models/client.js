import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("client", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
  
});