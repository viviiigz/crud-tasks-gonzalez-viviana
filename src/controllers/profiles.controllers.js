import ProfileModel from "../models/profiles.models.js";
import UserModel from "../models/users.models.js";



//traer a todos los perfiles con el usuario
export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await ProfileModel.findAll({
            include: [{
                model: UserModel, //modelo que vamos a usar 
                as: 'user', //alias que le pusimos a la relacion
                attributes: ['id', 'email', 'name']
            }]
    });
    return res.status(200).json(profiles);
} catch (error){
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los perfiles" });
  }
}
export const getAllProfilesById = async (req, res) => {}

//añadir un nuevo perfil y que este asociado a un usuario
export const createProfile = async (req, res) => {
    try {
        const {user_Id, bio} = req.body;
        //validar que el usuario exista
        if (!user_Id) {
            return res.status(404).json({ message: "El usuario asociado no existe" });
        }
        if (bio.length > 100) {
            return res.status(400).json({ message: "La biografía debe tener un máximo de 100 caracteres." });
        }
        const newProfile = await ProfileModel.create({user_Id, bio});
        return res.status(201).json({ message: "Perfil creado con éxito", profile: newProfile });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el perfil" });
    }

};

export const updateProfile = async (req, res) => {}

export const deleteProfile = async (req, res) => {}