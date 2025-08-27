import TeamModel from "../models/team.models.js";
import UserModel from "../models/users.models.js";

//traer todos los equipos con los usuarios
export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.findAll({
      include: [
        {
          model: UserModel, //modelo que vamos a usar
          attributes: ["id", "email", "name"],
        },
      ],
    });
    return res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

//traer un equipo por id con los usuarios asociados
export const getAllTeamsById = async (req, res) => {

  try {
    const { id } = req.params;
    const team = await TeamModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          attributes: ["id", "email", "name"],
        },
      ],
    });
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    return res.status(200).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el equipo" });
  }
}
//craear un nuevo equipo y asociarlo a un usuario
export const createTeam = async (req, res) => {
  try {
    const { name_team, user_Id } = req.body;
    //validar que el usuario exista
    if (!user_Id) {
      return res.status(404).json({ message: "El usuario asociado no existe" });
    }
    if (!name_team || typeof name_team !== "string" || name_team.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "El nombre del equipo es obligatorio y debe ser una cadena no vacía.",
        });
    }
    if (name_team.length > 100) {
      return res
        .status(400)
        .json({
          message:
            "El nombre del equipo debe tener un máximo de 50 caracteres.",
        });
    }

    //verificar si el equipo ya existe
    const existingTeam = await TeamModel.findOne({ where: { name_team } });
    if (existingTeam) {
      return res
        .status(400)
        .json({ message: "Ya existe un equipo con este nombre." });
    }
    const newTeam = await TeamModel.create({ name_team });
    //asociar el equipo al usuario

    const user = await UserModel.findByPk(user_Id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    await newTeam.addUser(user_Id);
    return res
      .status(201)
      .json({ message: "Equipo creado con éxito", team: newTeam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el equipo" });
  }
};

//actualizar un equipo por id y asociarlo a un usuario
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_team, user_Id } = req.body;

    //validar que el usuario exista
    if (!user_Id) {
      return res.status(404).json({ message: "El usuario asociado no existe" });
    }
    if (!name_team || typeof name_team !== "string" || name_team.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "El nombre del equipo es obligatorio y debe ser una cadena no vacía.",
        });
    }
    if (name_team.length > 100) {
      return res
        .status(400)
        .json({
          message:
            "El nombre del equipo debe tener un máximo de 50 caracteres.",
        });
    }

    const team = await TeamModel.findByPk(id);
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    //verificar si el equipo ya existe
    const existingTeam = await TeamModel.findOne({ where: { name_team } });
    if (existingTeam && existingTeam.id !== team.id) {
      return res
        .status(400)
        .json({ message: "Ya existe un equipo con este nombre." });
    }
    await team.update({ name_team });

    //asociar el equipo al usuario
    const user = await UserModel.findByPk(user_Id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    await team.addUser(user_Id);

    return res
      .status(200)
      .json({ message: "Equipo actualizado con éxito", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el equipo" });
  }

}

//eliminar un equipo por id
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await TeamModel.findByPk(id);
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    await team.destroy();
    return res.status(200).json({ message: "Equipo eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el equipo" });
  }
}
