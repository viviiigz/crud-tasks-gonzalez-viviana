import { Router } from "express";
import {
  getAllProfiles,
  getAllProfilesById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profiles.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getProfileByPkValidation,
  createProfileValidation,
  updateProfileValidation,
  deleteProfileValidation,
} from "../middlewares/validations/profiles.validations.js";
const router = Router();
//definir las rutas
router.get("/", getAllProfiles); //listar todas los perfiles
router.get("/:id", getProfileByPkValidation, validator, getAllProfilesById); //obtener un perfil por ID
router.post("/", createProfileValidation, validator, createProfile); //añadir un nuevo perfil
router.put("/:id", updateProfileValidation, validator, updateProfile); //actualizar un perfil por ID
router.delete("/:id", deleteProfileValidation, validator, deleteProfile); //eliminar un perfil por ID

export default router;
