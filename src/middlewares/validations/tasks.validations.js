import { body, param } from "express-validator";
import Task from "../../models/tasks.models.js";
import UserModel from "../../models/users.models.js";

//1 traer una tarea por id
export const getTaskByIdValidation = [
  param("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {

      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarea no encontrada");
      return true;
    }),
];


//2crear una tarea
//aca validamos que el titulo y la descripcion no esten vacios
// isComplete debe ser booleano
// el user_Id debe ser un numero entero y debe existir en la tabla de usuarios
export const createTaskValidation = [
  body("title")
  .notEmpty().withMessage("El título es obligatorio"),

  body("description")
  .notEmpty().withMessage("La descripción es obligatoria"),

  body("isComplete")
  .isBoolean().withMessage("isComplete debe ser booleano"),

  body("user_Id")
  .isInt().withMessage("El ID de usuario debe ser un número entero")
    .custom(async (user_Id) => { //verificamos que el usuario exista

      const user = await UserModel.findByPk(user_Id); //buscamos el usuario por su id
      if (!user) throw new Error("Usuario no encontrado"); //si no existe tiramos un error
      return true;
    }),
];
//2 actualizar una tarea 
//aca validamos que el id sea un numero entero y que exista en la tabla de tareas 
//luego los campos que se pueden actualizar son opcionales
//si vienen, los validamos
export const updateTaskIdValidation = [
  param("id")
  .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarea no encontrada");
      return true;
    }),
  body("title")
  .optional().notEmpty().withMessage("El título no puede estar vacío"),

  body("description").
  optional().notEmpty().withMessage("La descripción no puede estar vacía"),

  body("isComplete").optional().isBoolean().withMessage("isComplete debe ser booleano"),

];

// eliminar una tarea 
//aca validamos que el id sea un numero entero y que exista en la tabla de tareas
//luego en el controlador se elimina logicamente
export const deleteTaskValidation = [
  param("id")
  .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {

      const task = await Task.findByPk(id);
      if (!task) throw new Error("Tarea no encontrada");
      return true;
    }),
];