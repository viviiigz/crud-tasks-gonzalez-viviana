import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import ProfileModel from "./profiles.models.js";
// import Task from "./tasks.models.js";
// import UserTeamModel from "./user_team.models.js";
// import TeamModel from "./team.models.js";

const UserModel = sequelize.define(
  "User",
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
    },
  },
  {
    paranoid: true, // Habilitar eliminación lógica (soft delete)
  }
);

//relaciones uno a uno (un usuario puede tener un perfil)
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_Id",
  as: "profile",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_Id",
  as: "user",
  onDelete: "CASCADE", // Si se elimina un usuario, se elimina su perfil
});

//refactorizacion de codigo para que soporten estos modos de eliminacion

// PersonModel.addHook("afterDestroy", async (person) => {
//   const user = await UserModel.findOne({
//     where: { person_id: person.dataValues.id },
//   });

// si el usuario se elimina fisicamente, se elimina su perfil
UserModel.addHook("afterDestroy", async (user) => {
  const profile = await ProfileModel.findOne({
    // buscamos el perfil asociado
    where: { user_Id: user.dataValues.id }, // buscamos por user_Id
  });
  if (profile) {
    // si existe el perfil, lo eliminamos
    await profile.destroy();
  }
});

//   await user.destroy();

//el afterDestroy se ejecuta despues de que se elimina un registro
//el options.force indica si la eliminacion es fisica o logica
//si es fisica se elimina el registro de la base de datos
//si es logica se marca el registro como eliminado (se agrega la fecha de eliminacion

export default UserModel;
