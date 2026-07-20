import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userType: {
      type: String,
      uppercase: true,
      enum: ["ADMIN", "USER"],
      required: true,
      default: "USER",
    },
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      uppercase: true,
    },
    surname: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      uppercase: true,
    },
    identification: {
      type: String,
      required: [true, "DPI/Pasaporte es obligatorio"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    phone: {
      type: String,
      required: [true, "Un número de teléfono es obligatorio"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Un correo es obligatorio"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: [6, "La contraseña debe tener 6 caracteres mínimo"],
      required: [true, "La contraseña es obligatoria"],
    },
    gender: {
      type: String,
      uppercase: true,
      enum: ["FEMENINO", "MASCULINO", "OTRO", "PREFIERO NO DECIRLO"],
      required: [true, "El género es obligatorio"],
    },
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true },
);

export default model("User", userSchema);
