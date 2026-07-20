import Report from "../Reports/report.model.js";
import User from "../User/user.model.js";

export const test = async (req, res) => {
  return res.send({ message: "REPORT | Función Test" });
};

export const createReport = async (req, res) => {
  try {
    // Extraer de forma segura el id del usuario del token ya validado
    const { uid } = req.user;

    // Extraer cuerpo del reporte enviado desde el cliente
    const { description, abuseType, location, evidenceImages, isAnonymous } =
      req.body;

    // Instanciar y guardar el nuevo reporte asociandolo al usuario
    const newReport = new Report({
      user: uid,
      description,
      abuseType,
      location,
      evidenceImages: evidenceImages || [],
      isAnonymous: isAnonymous !== undefined ? isAnonymous : true,
    });

    const savedReport = await newReport.save();

    // Vincular el reporte en el documento del usuario
    await User.findByIdAndUpdate(
      uid,
      { $push: { reports: savedReport._id } },
      { returnDocument: "after" },
    );

    return res.send({
      message: "Reporte registrado exitosamente",
      report: savedReport,
    });
  } catch (error) {
    console.error("Error al registrar el reporte: ", error);
    // Si hay fallos de validación de Mongose (enum/campos requeridos) capturarlos
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .send({ message: "Datos Inválidos", errors: messages });
    }
    return res
      .status(500)
      .send({ message: "Error interno al procesar el reporte" });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const response = await Report.find().sort({ createdAt: -1 });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al hacer Get", error);
    return res.status(500).json({
      message: "Error al obtener todos los reportes",
    });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const estadosValidos = ["RECIBIDO", "SEGUIMIENTO", "FINALIZADO"];
    if (!estadosValidos.includes(status?.toUpperCase())) {
      return res.status(400).json({
        message: "El estado proporcionado no es válido",
      });
    }

    //Buscar Reporte por ID y actualizar estado
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status: status.toUpperCase() },
      { returnDocument: 'after'},
    );
    if (!updatedReport) {
      return res.status(404).json({
        message: "El reporte no existe o no fué encontrado",
      });
    }

    return res.status(200).json({
      message: "Estado actualizado !!",
      report: updatedReport,
    });
  } catch (error) {
    console.error("Error al hacer Update, ", error);
    return res.status(500).json({
      message: "Error al actualizar el estado reporte",
    });
  }
};
