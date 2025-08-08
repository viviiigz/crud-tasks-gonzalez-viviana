//rutas que voy a utilizar
import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = Router();
//definir las rutas
router.get("/", getTasks); //listar todas las tareas
router.post("/", createTask); //añadir una nueva tarea
router.get("/:id", getTaskById); //obtener una tarea por ID
router.put("/:id", updateTask); //actualizar una tarea por ID
router.delete("/:id", deleteTask); //eliminar una tarea por ID


export default router;