import {body, param} from "express-validator";

import UserModel from "./../../models/users.models.js";


//1 traer un usuario por id
//aca pido el id por parametro y lo valido
//luego en el controlador se busca en la base de datos
export const getUserByPkValidations = [
  param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
      const user = await UserModel.findByPk(value); 
      if (!user) {
        throw new Error('No existe un usuario con ese id');
      }
    }),

];
//2 crear usuario
//aca estoy diciendo que el nombre no puede estar vacio
// el email debe ser un email valido y no repetido
// la contraseña debe tener al menos 8 caracteres
export const createUserValidation =  [
  body("name")
  .notEmpty().withMessage("El nombre es obligatorio")
  .isString().withMessage("El nombre debe ser una cadena de texto"),

  body("email")
  .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Email inválido")
    .custom(async (email) => {
      //vemos si ya existe el email en la base de datos
      const user = await UserModel.findOne({ where: { email: value } });
      if (user){
         throw new Error("El email ya está en uso");
      }
      return true;
    }),
  body("password")
  .notEmpty().withMessage("La contraseña es obligatoria")
  .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

//2 actualizar usuario
//aca pido el id por parametro y lo valido
//luego los campos que se pueden actualizar son opcionales
export const updateUserValidation = [ 
param("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),
  body("name").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("password").optional().isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

//3 eliminar usuario
//aca pido el id por parametro y lo valido
//luego en el controlador se elimina logicamente
export const deleteUserValidation = [
  param("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      return true;
    }),
];


