import Task from '../models/tasks.models.js';
import User from '../models/users.models.js';

//listar todas las tareas y el usuario que las creo 
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      // taemos datos de usuario
      include: [{
        model: User, //importamos users
         as: 'user',
        attributes: ['id', 'email', 'name'] // especificamos los atributos de los usuarios que queremos mostrar
      }]
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las tareas" });
  }
}

//añadir una nueva tarea y q este relacionada con un usuario
export const createTask = async (req, res) => {
  const { title, description, isComplete, user_Id } = req.body;
  try {
    //validar que el usuario exista
    if (!user_Id) {
      return res.status(404).json({ error: 'El usuario asociado no existe.' });
    }
    if (!title || typeof title !== 'string' || title.length === 0 || title.length > 100) {
      return res.status(400).json({ error: 'El título es obligatorio, debe ser una cadena no vacía y tener un máximo de 100 caracteres.' });
    }
    if (!description || typeof description !== 'string' || description.length === 0 || description.length > 100) {
      return res.status(400).json({ error: 'La descripción es obligatoria, debe ser una cadena no vacía y tener un máximo de 100 caracteres.' });
    }
    if (typeof isComplete !== 'boolean') {
      return res.status(400).json({ error: 'El campo isComplete es obligatorio y debe ser un valor booleano.' });
    }


    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ error: 'Ya existe una tarea con este título.' });
    }
    const newTask = await Task.create({ title, description, isComplete, user_Id }); //se incuyo el user_id
    res.status(201).json({ message: 'Tarea creada con éxito', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


//obtener una tarea por ID con el usuario que la creo
export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id,{
      include: [{
        model: User, //importamos users
         as: 'user',
        attributes: ['id', 'email', 'name'] // especificamos los atributos de los usuarios que queremos mostrar
      }]
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la tarea" });
  }
}

//actualizar una tarea por ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    if ((title && (typeof title !== 'string' || title.length === 0 || title.length > 100)) ||
        (description && (typeof description !== 'string' || description.length === 0 || description.length > 100)) ||
        (isComplete !== undefined && typeof isComplete !== 'boolean')) {
      return res.status(400).json({ error: 'Los datos superan el límite o el tipo es incorrecto.' });
    }
// si se envía un nuevo userId, verificar que el usuario exista
    if (user_Id) {
      const userExists = await User.findByPk(user_Id);
      if (!userExists) {
        return res.status(404).json({ error: 'El usuario no existe.' });
      }
    }

  //unicidaad de titulo  
    if (title && title !== task.title) {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        return res.status(400).json({ error: 'Ya existe una tarea con este título.' });
      }
    }
//actualizar los campos de la tarea
    task.title = title || task.title;
    task.description = description || task.description;
    task.isComplete = isComplete !== undefined ? isComplete : task.isComplete;
    await task.save();
    res.status(200).json({ message: 'Tarea actualizada con éxito', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


//eliminar una tarea por ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    await task.destroy();
    res.status(200).json({ message: "Tarea eliminada con éxito" }); //para que avise que se borró correctamente
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la tarea" });
  }
}

//aliminacion en cascada, elimino el padre y todos los que se relaciona con el tambien se borran
 