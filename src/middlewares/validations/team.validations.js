import { body, param } from "express-validator";
import TeamModel from "../../models/team.models.js";


export const getAllTeamsByIdValidation = [
    param("id")
        .isInt()
        .withMessage("El ID del equipo debe ser un número entero.")
        .custom(async (value) => {
        const team = await TeamModel.findByPk(value);
        if (!team) {
            throw new Error("El equipo con el ID proporcionado no existe.");
        }
        }),
];

export const createTeamValidation = [
    body("name_team")
        .notEmpty()
        .withMessage("El nombre del equipo es obligatorio.")
        .isString()
        .withMessage("El nombre del equipo debe ser una cadena de texto.")
        .isLength({ max: 100 })
        .withMessage("El nombre del equipo no debe exceder los 100 caracteres."),
    body("user_Id")
        .notEmpty()
        .withMessage("El ID del usuario asociado es obligatorio.")
        .isInt()
        .withMessage("El ID del usuario debe ser un número entero."),
];

export const updateTeamValidation = [
    param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
        const team = await TeamModel.findByPk(value); 
        if (!team) {
            throw new Error('No existe un equipo con ese id');
        }
        }),
    body("name_team")
        .optional()
        .notEmpty()
        .withMessage("El nombre del equipo no puede estar vacío.")
        .isString()
        .withMessage("El nombre del equipo debe ser una cadena de texto.")
        .isLength({ max: 100 })
        .withMessage("El nombre del equipo no debe exceder los 100 caracteres."),

];

export const deleteTeamValidation = [
    param('id')
    .isInt().withMessage('El id debe ser un entero')
    .custom(async (value) => {
        const team = await TeamModel.findByPk(value); 
        if (!team) {
            throw new Error('No existe un equipo con ese id');
        }
        }),

];