import { Router } from "express";
import {
  getAllUserTeam,
  createUserTeam,
} from "../controllers/users_team.controllers.js";

const router = Router();
//definir las rutas
router.get("/", getAllUserTeam); //listar todas los usuarios
router.post("/", createUserTeam); //añadir un nuevo usuario


export default router;