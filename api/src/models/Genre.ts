import { DataTypes } from "sequelize";
import { conn } from "../db";

export const Genre = conn.define("genre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
