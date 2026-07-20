/* import mongoose from "mongoose";

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
}; */

import mongoose from "mongoose";

// Caché global para reutilizar la conexión entre invocaciones (serverless)
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export const connectDB = async () => {
  // Si ya hay una conexión lista, reutilízala
  if (cached.conn) {
    return cached.conn;
  }

  // Si no hay una promesa de conexión en curso, créala
  if (!cached.promise) {
    mongoose.connection.on("error", () => {
      console.log("MongoDB | No se pudo conectar a mongoDB");
    });
    mongoose.connection.on("connecting", () =>
      console.log("MongoDB | Intentando Conexión..."),
    );
    mongoose.connection.on("connected", () =>
      console.log("MongoDB | Conectado a mongoDB"),
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB | Desconectado"),
    );

    cached.promise = mongoose
      .connect(process.env.ConnectionURI, {
        bufferCommands: false, // evita que las queries se queden "colgadas" bufferizando
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // si falla, permite reintentar en la siguiente invocación
    throw err;
  }

  return cached.conn;
};