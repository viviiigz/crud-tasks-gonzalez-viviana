import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from './users.models.js';

const TeamModel = sequelize.define(
  'Team',
  {
    name_team: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
},
  {
    timestamps:false // No usar timestamps
  },
);



//RELACIONES UNO A MUCHOS (UN EQUIPO PUEDE TENER MUCHOS USUARIOS)
TeamModel.hasMany(UserModel, {
  foreignKey: 'team_Id',
  as: 'user'
});

UserModel.belongsTo(TeamModel, {
  foreignKey: 'team_Id',
  as: 'team'
});



export default TeamModel;