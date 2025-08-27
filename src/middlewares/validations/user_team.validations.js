import { body } from "express-validator";
import UserModel from "../../models/user.models.js";
import TeamModel from "../../models/team.models.js";
import UserTeamModel from "../../models/user_team.models.js";

export const getAllUserTeamByIdValidation = [
  param("id")
    .isInt()
    .withMessage(
      "El ID de la relación usuario-equipo debe ser un número entero."
    )
    .custom(async (value) => {
      const userTeam = await UserTeamModel.findByPk(value);
      if (!userTeam) {
        throw new Error(
          "La relación usuario-equipo con el ID proporcionado no existe."
        );
      }
    }),
];
//1 crear un usuario en un equipo guau
export const createUserTeamValidation = [
  body("user_Id")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio.")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero.")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("El usuario con el ID proporcionado no existe.");
      }
    }),
  body("team_Id")
    .notEmpty()
    .withMessage("El ID del equipo es obligatorio.")
    .isInt()
    .withMessage("El ID del equipo debe ser un número entero.")
    .custom(async (value) => {
      const team = await TeamModel.findByPk(value);
      if (!team) {
        throw new Error("El equipo con el ID proporcionado no existe.");
      }
    }),
];
//2
export const updateUserTeamValidation = [
  param("id")
    .isInt()
    .withMessage(
      "El ID de la relación usuario-equipo debe ser un número entero."
    )
    .custom(async (value) => {
      const userTeam = await UserTeamModel.findByPk(value);
      if (!userTeam) {
        throw new Error(
          "La relación usuario-equipo con el ID proporcionado no existe."
        );
      }
    }),
  body("user_Id")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio.")
    .isInt()
    .withMessage("El ID del usuario debe ser un número entero.")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("El usuario con el ID proporcionado no existe.");
      }
    }),
  body("team_Id")
    .notEmpty()
    .withMessage("El ID del equipo es obligatorio.")
    .isInt()
    .withMessage("El ID del equipo debe ser un número entero.")
    .custom(async (value) => {
      const team = await TeamModel.findByPk(value);
      if (!team) {
        throw new Error("El equipo con el ID proporcionado no existe.");
      }
    }),
];

export const deleteUserTeamValidation = [
  param("id")
    .isInt()
    .withMessage(
      "El ID de la relación usuario-equipo debe ser un número entero."
    )
    .custom(async (value) => {
      const userTeam = await UserTeamModel.findByPk(value);
      if (!userTeam) {
        throw new Error(
          "La relación usuario-equipo con el ID proporcionado no existe."
        );
      }
    }),
];
