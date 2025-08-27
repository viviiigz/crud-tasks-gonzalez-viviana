import { Router } from "express";
import {
  getAllUserTeam,
  getAllUserTeamById,
  createUserTeam,
  updateUserTeam,
  deleteUserTeam
} from "../controllers/users_team.controllers.js";
import { validator } from "../middlewares/validator.js";
import { getAllTeamsByIdValidation, createTeamValidation, updateTeamValidation, deleteTeamValidation } from "../middlewares/validations/team.validations.js";
const router = Router();
//definir las rutas
router.get("/", getAllUserTeam); //listar todas los usuarios
router.get("/:id", getAllTeamsByIdValidation, validator, getAllUserTeamById); //listar un usuario por id
router.post("/",createTeamValidation, validator, createUserTeam); //añadir un nuevo usuario
router.put("/:id",updateTeamValidation, validator, updateUserTeam); //actualizar un usuario por id
router.delete("/:id",deleteTeamValidation, validator, deleteUserTeam); //eliminar un

export default router;