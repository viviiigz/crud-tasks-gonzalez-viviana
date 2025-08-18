import UserTeamModel from "../models/user_team.models.js";
import UserModel from "../models/users.models.js";
import TeamModel from "../models/team.models.js";

export const getAllUserTeam = async (req, res) => {
    
  try {
    const userTeams = await UserTeamModel.findAll({
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["id", "email", "name"],
        },
        {
          model: TeamModel,
          as: "team",
          attributes: ["id", "name_team"],
        },
      ],
    });
    return res.status(200).json(userTeams);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener los equipos de usuario" });
  }
};
export const createUserTeam = async (req, res) => {
  try {
    const { user_Id, team_Id } = req.body;
    //validar que el usuario y el equipo existan
    if (!user_Id || !team_Id) {
      return res
        .status(404)
        .json({ message: "El usuario o el equipo asociado no existe" });
    }
    const user = await UserModel.findByPk(user_Id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    const team = await TeamModel.findByPk(team_Id);
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado." });
    }

    //verificar si ya existe la relacion
    const existingUserTeam = await UserTeamModel.findOne({
      where: { user_Id, team_Id },
    });
    if (existingUserTeam) {
      return res
        .status(400)
        .json({
          message: "Ya existe una relación entre este usuario y este equipo.",
        });
    }

    //crear la relacion entre usuario y equipo
    const newUserTeam = await UserTeamModel.create({ user_Id, team_Id });
    return res
      .status(201)
      .json({ message: "Relación creada con éxito", userTeam: newUserTeam });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear la relación entre usuario y equipo" });
  }
};
