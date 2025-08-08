import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = Router();
//definir las rutas
router.get("/", getAllUsers); //listar todas los usuarios
router.post("/", createUser); //añadir un nuevo usuario
router.get("/:id", getUserById); //obtener un usuario por ID
router.put("/:id", updateUser); //actualizar un usuario por ID
router.delete("/:id", deleteUser); //eliminar un usuario por ID


export default router;