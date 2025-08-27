import { Router } from "express";
import {
  getAllTeams,
  getAllTeamsById,
  createTeam,
  updateTeam,
  deleteTeam
} from "../controllers/team.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getAllTeamsByIdValidation,
  createTeamValidation,
  updateTeamValidation,
  deleteTeamValidation
} from "../middlewares/validations/team.validations.js";

const router = Router();
//definir las rutas
router.get("/", getAllTeams); //listar todas los usuarios
router.get("/:id", getAllTeamsByIdValidation, validator, getAllTeamsById); //listar un usuario por id
router.post("/",createTeamValidation, validator, createTeam); //añadir un nuevo usuario
router.put("/:id",updateTeamValidation, validator, updateTeam); //actualizar un usuario por id
router.delete("/:id",deleteTeamValidation, validator, deleteTeam); //eliminar un usuario por id

export default router;