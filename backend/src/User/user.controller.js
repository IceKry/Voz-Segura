import User from "./user.model.js";
import { encrypt, checkPassword } from "../Utils/validator.js";
//import { connectDB } from "../../config/mongo.js";
import { generateJWT } from "../Utils/jwt.js";

export const test = async (req, res) => {
  return res.send({ message: "USER | Función Test" });
};

export const registUser = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);

    data.password = await encrypt(data.password);
    let user = new User(data);
    await user.save();
    return res.send({ message: "Usuario registrado Exitosamente !!" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error al registrar Usuario" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({
        message: "Usuario no Existe o no Encontrado, intente otra vez",
      });

    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        uid: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType
      };

      let token = await generateJWT(loggedUser);

      return res.send({
        message: `Bienvenido/a ${user.name}`,
        loggedUser,
        token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error al Iniciar Sesión" });
  }
};

export const getUserReports = async (req, res) => {
  try {
    // Tomar el id del usuario autenticado (inyectado por el JWT)
    console.log('uid: ',req.user);
    const { uid } = req.user;
    

    // Buscar al usuario y "poblar" el campo de repotes
    const userWithRepots = await User.findById(uid)
      .select("reports")
      .populate({
        path: "reports",
        options: { sort: { createdAt: -1 } }, // Ordenar del más reciente al más antiguo
      });
    if (!userWithRepots) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Devolver directamente el array de reportes completos
    return res.send({
      message: "Historial listado con éxito",
      reports: userWithRepots.reports,
    });
  } catch (error) {
    console.error("Error al listar reportes: ", error);
    return res
      .status(500)
      .send({ message: "error al obtener los reportes del usuario" });
  }
};
