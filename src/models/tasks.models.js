import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import UserModel from './users.models.js'; // Importar el modelo de usuario

  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    timestamps:false // No usar timestamps
  },
);


// Relación con el modelo User: 
// un usuario puede tener muchas tareas y una tarea pertenece a un usuario
Task.belongsTo(UserModel, {
  foreignKey: 'user_Id',
  as: 'user', // Alias para la relación
  onDelete: 'CASCADE' // Si se elimina un usuario, se eliminan sus tareas
});

UserModel.hasMany(Task, {
  foreignKey: 'user_Id',
  as: 'tasks', // Alias para la relación
});

export default Task;