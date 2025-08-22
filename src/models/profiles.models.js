import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ProfileModel = sequelize.define(
  'Profile',
  {
    bio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
},
  {
    timestamps:false , // No usar timestamps
  },
);

export default ProfileModel;