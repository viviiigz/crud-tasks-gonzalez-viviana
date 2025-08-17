import { Router } from "express";
import {
  getAllProfiles,
  createProfile
} from "../controllers/profiles.controllers.js";

const router = Router();
//definir las rutas
router.get("/", getAllProfiles); //listar todas los perfiles
router.post("/",createProfile ); //añadir un nuevo perfil

export default router;