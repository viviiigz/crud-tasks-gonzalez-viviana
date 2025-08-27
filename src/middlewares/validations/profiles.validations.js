import { body, param } from "express-validator";
import ProfileModel from "../../models/profiles.models.js";
import UserModel from "../../models/users.models.js";

export const getProfileByPkValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("Perfil no encontrada");
      return true;
    }),
];

export const createProfileValidation = [
  body("user_Id")
    .isInt()
    .withMessage("El ID de usuario debe ser un número entero")
    .custom(async (user_Id) => {
      const user = await UserModel.findByPk(user_Id);
      if (!user) throw new Error("Usuario no encontrado");
      // para la relacion uno a uno
      const existingProfile = await ProfileModel.findOne({
        where: { user_Id },
      });
      if (existingProfile)
        throw new Error("Este usuario ya tiene un perfil asociado");

      return true;
    }),
  body("bio")
    .isLength({ max: 100 })
    .withMessage("La biografía debe tener un máximo de 100 caracteres."),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("Perfil no encontrado");
      return true;
    }),
  body("bio")
    .optional()
    .isLength({ max: 100 })
    .withMessage("La biografía debe tener un máximo de 100 caracteres."),
];

export const deleteProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const profile = await ProfileModel.findByPk(id);
      if (!profile) throw new Error("Perfil no encontrada");
      return true;
    }),
];
