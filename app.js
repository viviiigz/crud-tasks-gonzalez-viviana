import express from "express";
import dotenv from "dotenv";
// import tasksRoutes from "./routes/tasks.js";
// import usersRoutes from "./routes/users.js"; esto lo voy a usar despues
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express();
app.use(express.json());

//rutas
// app.use("/api/tasks", tasksRoutes);
// app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 3000;

// sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
