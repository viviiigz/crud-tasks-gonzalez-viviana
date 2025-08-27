import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";
import { getUserByPkValidations, createUserValidation, updateUserValidation, deleteUserValidation } from "../middlewares/validations/users.validations.js";
import { validator} from "../middlewares/validator.js";


const router = Router();
//definir las rutas
router.get("/", getAllUsers); //listar todas los usuarios
router.post("/", createUserValidation, validator, createUser); //añadir un nuevo usuario
router.get("/:id",getUserByPkValidations,validator, getUserById); //obtener un usuario por ID
router.put("/:id",updateUserValidation, validator, updateUser); //actualizar un usuario por ID
router.delete("/:id", deleteUserValidation, validator, deleteUser); //eliminar un usuario por ID


export default router;