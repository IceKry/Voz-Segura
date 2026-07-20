import jwt from "jsonwebtoken";
import { connectDB } from "../../config/mongo.js";

export const generateJWT = async (payload) => {
  try {
    const key = process.env.key;
    return jwt.sign(payload, key, {
      expiresIn: "3h",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

export const validateJwt = async (req, res, next) => {
  let token = req.headers["authorization"];

  //# Verificar que el token exista
  if (!token) return res.status(401).send("Token inválido o no autorizado");

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, process.env.key);
    req.user = decoded;
  } catch (error) {
    console.error(error);
    return res.status(401).send("Token inválido");
  }
  return next()
};
