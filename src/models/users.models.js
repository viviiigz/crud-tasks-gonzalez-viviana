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
    timestamps:false, // No usar timestamps
    // paranoid: true //permite eliminar registros sin borrarlos físicamente- clase 21/08 modificado

  },
);


//relaciones uno a uno (un usuario puede tener un perfil)
UserModel.hasOne(ProfileModel,{
  foreignKey: 'user_Id',
  as: 'profile'
})

ProfileModel.belongsTo(UserModel,{
  foreignKey: 'user_Id',
  as: 'user',
  // onDelete: 'CASCADE' // si quiero eliminar la entidad padre y sus relaciones, uso el onDelete: 'CASCADE'
});

//si quiero eliminar la entidad padre y sus relaciones, uso el onDelete: 'CASCADE'

// UserModel.addHook("afterDestroy",(user) => { //solo cuando haces las 2 consultas por defecto
  // Eliminar el perfil asociado al usuario eliminado
  // console.log(`Eliminando perfil asociado al usuario con ID: ${user.id}`);
//HASTA DONDE QUERES QUE SE ELIMINE DONDE AFECTE EL PADRE
  //buscar usuario por id

  //ELIMINACION LÓGICA Y EN CASCADA 21-08



// });


export default UserModel;