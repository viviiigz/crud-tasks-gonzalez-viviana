import express from "express";
import dotenv from "dotenv";
import tasksRoutes from "./src/routes/tasks.routes.js";
import usersRoutes from "./src/routes/users.routes.js"; //esto lo voy a usar despues
import sequelize from "./src/config/database.js";
import ProfileModel from "./src/models/profiles.models.js"; // Importar el modelo de perfiles
import TeamModel from "./src/models/team.models.js"; // Importar el modelo de equipos
import UserTeamModel from "./src/models/user_team.models.js"; // Importar el modelo de usuario-equipo
import profilesRoutes from "./src/routes/profiles.routes.js"; // Importar las rutas de perfiles
import teamsRoutes from "./src/routes/team.routes.js"; // Importar las rutas de equipos
import userTeamRoutes from "./src/routes/user_team.routes.js"; // Importar las rutas de usuario-equipo

dotenv.config();

const app = express();
app.use(express.json());

//rutas
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profilesRoutes); 
app.use("/api/teams", teamsRoutes);
app.use("/api/user_teams", userTeamRoutes); 

const PORT = process.env.PORT || 3000;

// sincronizar la base de datos y arrancar el servidor
sequelize.sync({force: true}).then(() => {
  console.log("Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});

