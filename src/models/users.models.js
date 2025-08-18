import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import ProfileModel from "./profiles.models.js";


const UserModel = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
    },
  {
    timestamps:false // No usar timestamps
  },
);


//relaciones uno a uno (un usuario puede tener un perfil)
UserModel.hasOne(ProfileModel,{
  foreignKey: 'user_Id',
  as: 'profile'
})

ProfileModel.belongsTo(UserModel,{
  foreignKey: 'user_Id',
  as: 'user'
});

export default UserModel;