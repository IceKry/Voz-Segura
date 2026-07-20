import { compare, hash } from "bcrypt";

export const encrypt = (password) => {
  return hash(password, 10);
};

export const checkPassword = async (password, hash) => {
  try {
    return await compare(password, hash);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      message: "Se quiere verificar el rol sin validar token primero",
    });
  }
  const { userType } = req.user;
  if (userType !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado. Este panel solo es para Administradores",
    });
  }
  next();
};
