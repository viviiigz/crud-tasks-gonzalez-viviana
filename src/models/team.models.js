import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const TeamModel = sequelize.define(
  'Team',
  {
    name_team: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
},
  {
    timestamps:false // No usar timestamps
  },
);




export default TeamModel;