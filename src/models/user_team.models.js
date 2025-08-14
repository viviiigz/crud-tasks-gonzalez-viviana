import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const UserTeamModel = sequelize.define(
  'User_team',
  {
  
},
  {
    timestamps:false // No usar timestamps
  },
);

export default UserTeamModel;