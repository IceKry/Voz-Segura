import { model, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El reporte debe estar asociado a un usuario"],
    },
    description: {
      type: String,
      required: [
        true,
        "La descripción de los Hechos es obligatoria y debe ser clara y honesta",
      ],
      minlength: [6, "Por favor, detalla un poco más lo sucedido"],
    },
    abuseType: {
      type: String,
      uppercase: true,
      enum: [
        "ACOSO CALLEJERO",
        "ACOSO ESCOLAR",
        "CYBERACOSO",
        "VIOLENCIA FÍSICA",
        "VIOLENCIA VERBAL",
        "EXHIBICIONISMO",
        "OTRO",
      ],
      required: [true, "Debe seleccionar el tipo de abuso"],
    },
    location: {
      municipality: {
        type: String,
        uppercase: true,
        required: [
          true,
          "El municipio es obligatorio para el mapeo estadístico",
        ],
        enum: ["GUATEMALA", "MIXCO", "VILLA NUEVA"],
      },

      zone: {
        type: Number,
        required: [true, "La zona es obligatoria para el mapeo estadístico"],
        min: [1, "La zona mínima es 1"],
        max: [25, "La zona máxima es 25"],
      },
      reference: {
        type: String,
        required: [
          true,
          "La ubicación detallada o puntos de referencia son obligatorios",
        ],
        trim: true,
      },
    },
    evidenceImages: [
      {
        type: String,
      },
    ],
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      uppercase: true,
      enum: ["RECIBIDO", "EN REVISIÓN", "ARCHIVADO"],
      default: "RECIBIDO",
    },
  },
  { timestamps: true },
);

export default model("Report", reportSchema);
