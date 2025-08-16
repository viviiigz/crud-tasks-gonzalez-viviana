import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import TeamModel from "./team.models.js";
import UserModel from "./users.models.js";

//en la relacion muchos a  muchos siempre hay que poner id
const UserTeamModel = sequelize.define(
  "User_team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    timestamps: false, // No usar timestamps
  }
);

// Relación muchos a muchos entre User y Team
// Pasando una cadena a through arriba, le pedimos a Sequelize que genere automáticamente un modelo
//  llamado User_Profiles como el a través de la mesa (también conocida como tabla de unión)


//aca usermodel pertenece a muchos equipos y teammodel pertenece a muchos usuarios
UserModel.belongsToMany(TeamModel, {
  through: UserTeamModel,
  foreignKey: "user_Id",
  as: "teams"
});

TeamModel.belongsToMany(UserModel, {
  through: UserTeamModel,
  foreignKey: "team_Id",
  as: "users"
});


//preguntar al profe lo que paso con el as users

export default UserTeamModel;
