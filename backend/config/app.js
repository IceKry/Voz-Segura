import express, { urlencoded } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "../src/User/user.routes.js";
import reportRoutes from '../src/Reports/report.routes.js'

//# Configs Servidor
const app = express();
config();
const port = process.env.PORT || 3200;

//# Express Configs
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(helmet());
app.use(morgan("dev"));

//# Rutas
app.use('/user', userRoutes)
app.use('/report', reportRoutes)

//# Levantar Servidor
export const initServer = async () => {
  app.listen(port);
  console.log(`Servidor HTTP Corriendo en puerto: ${port}`);
};
