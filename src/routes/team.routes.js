import { Router } from "express";
import {
  getAllTeams,
  createTeam,
} from "../controllers/team.controllers.js";

const router = Router();
//definir las rutas
router.get("/", getAllTeams); //listar todas los usuarios
router.post("/", createTeam); //añadir un nuevo usuario

export default router;