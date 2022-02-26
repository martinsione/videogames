import { DataTypes } from "sequelize";
import { conn } from "../db";

export const Videogame = conn.define("videogame", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  released: {
    type: DataTypes.DATE,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  platforms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});
