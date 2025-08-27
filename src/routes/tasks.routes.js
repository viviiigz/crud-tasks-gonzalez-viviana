//rutas que voy a utilizar
import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

import { validator } from "../middlewares/validator.js";

import {
  getTaskByIdValidation,
  createTaskValidation,
  updateTaskIdValidation,
  deleteTaskValidation,
} from "../middlewares/validations/tasks.validations.js";

const router = Router();
//definir las rutas
router.get("/", getTasks); //listar todas las tareas
router.post("/", createTaskValidation, validator, createTask); //añadir una nueva tarea
router.get("/:id", getTaskByIdValidation, validator, getTaskById); //obtener una tarea por ID
router.put("/:id", updateTaskIdValidation, validator, updateTask); //actualizar una tarea por ID
router.delete("/:id", deleteTaskValidation, validator, deleteTask); //eliminar una tarea por ID

export default router;
