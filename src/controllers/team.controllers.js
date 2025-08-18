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
