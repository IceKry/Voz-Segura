import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("error", () => {
      console.log("MongoDB | No se pudo conectar a mongoDB");
      mongoose.disconnect();
    });
    mongoose.connection.on("connecting", () =>
      console.log("MongoDB | Intentando Conexión..."),
    );
    mongoose.connection.on("connected", () =>
      console.log("MongoDB | Conectado a mongoDB"),
    );
    mongoose.connection.on("open", () =>
      console.log("MongoDB | Conectado a base de datos"),
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB | Desconectado"),
    );
    mongoose.connection.on("reconnected", () =>
      console.log("MongoDB | Reconectando a mongoDB..."),
    );
    await mongoose.connect(process.env.ConnectionURI);
  } catch (error) {
    console.error("Fallo en conexión a DB, intente otra vez ", error);
  }
};
