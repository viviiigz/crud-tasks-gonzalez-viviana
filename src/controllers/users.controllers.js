import User from '../models/users.models.js';
import Tasks from '../models/tasks.models.js';


//crear un nuevo usuario
export const createUser = async (req, res) => {
  const {name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está en uso.' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//obtener todos los usuarios con sus respectivas tareas 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      // usamos include para traer todas las tareas asociadas a cada usuario
      include: [{
        model: Tasks, //importamos tasks
         as: 'tasks',
        attributes: ['id', 'title', 'isComplete'] // especificamos los atributos de la tarea que queremos mostrar
      }]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// obtener un usuario por su ID con su tarea
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id ,{
      include: [{
        model: Tasks,
        as: 'tasks',
        attributes: ['id', 'title', 'isComplete']
      }]
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    await user.update(req.body);
    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
