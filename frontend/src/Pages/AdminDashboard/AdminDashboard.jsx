import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { UseReport } from "../../Shared/Hooks/UseReport";

export const AdminDashboard = () => {
  const {
    getHistory,
    reports,
    loading,
    error,
    updateReportStatus,
    getAllHistory,
    updateReport,
  } = UseReport();
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [updatingId, setUpdatingId] = useState(false);

  const [nombre, setNombre] = useState(() => {
    return localStorage.getItem("nombreUsuario") || "Usuario";
  });

  const [adminNombre, setAdminNombre] = useState(() => {
    return localStorage.getItem("nombreUsuario") || "Administrador";
  });

  useEffect(() => {
    getAllHistory();
  }, []);

  useEffect(() => {
    if (reports.length > 0 && !reporteSeleccionado) {
      setReporteSeleccionado(reports[0]);
    } else if (reporteSeleccionado) {
      // Mantener actualizado el reporte seleccionado si la lista cambia (ej. tras un update)
      const actualizado = reports.find(
        (r) => r._id === reporteSeleccionado._id,
      );
      if (actualizado) setReporteSeleccionado(actualizado);
    }
  }, [reports]);

  const handleStatusChange = async (nuevoEstado) => {
    if (!reporteSeleccionado || updatingId) return;
    setUpdatingId(true);
    try {
      if (updateReport) {
        await updateReport(reporteSeleccionado._id, nuevoEstado);
      } else {
        console.warn(
          "La función updateReportStatus no está implementada en UseReport",
        );
      }
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    } finally {
      setUpdatingId(false);
    }
  };

  const getBadgeStyle = (estado) => {
    switch (estado?.toUpperCase()) {
      case "FINALIZADO":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "SEGUIMIENTO":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "RECIBIDO":
      default:
        return { backgroundColor: "#e0f2fe", color: "#0369a1" };
    }
  };

  const formatFecha = (dateString) => {
    if (!dateString) return "Reciente";
    const fecha = new Date(dateString);
    return fecha.toLocaleDateString("es-GT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f4f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4vh 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Círculo Morado */}
      <div
        style={{
          position: "absolute",
          top: "-15vh",
          left: "-15vh",
          width: "45vh",
          height: "45vh",
          borderRadius: "50%",
          backgroundColor: "#8891fa",
          opacity: "0.7",
          zIndex: 0,
        }}
      />

      {/* Círculo lila */}
      <div
        style={{
          position: "absolute",
          bottom: "-15vh",
          right: "-15vh",
          width: "45vh",
          height: "45vh",
          borderRadius: "50%",
          backgroundColor: "#ab90fb",
          opacity: "0.7",
          zIndex: 0,
        }}
      />

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={11} xl={10}>
            <Card
              style={{
                borderRadius: "24px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                padding: "2rem",
              }}
            >
              <Card.Body className="p-0">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <h4
                      style={{
                        fontWeight: "bold",
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      Admin Panel
                    </h4>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#6366f1"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: "700",
                        color: "#1e1b4b",
                      }}
                    >
                      {" "}
                      {nombre}
                    </span>
                  </div>
                </div>

                {loading && (
                  <div className="text-center py-5">
                    <Spinner
                      animation="border"
                      variant="primary"
                      className="mb-2"
                    />
                    <p className="text-muted">
                      Cargando expedientes entrantes...
                    </p>
                  </div>
                )}

                {error && (
                  <div
                    className="alert alert-danger"
                    style={{ borderRadius: "12px" }}
                  >
                    {error}
                  </div>
                )}

                {!loading && reports.length === 0 && !error && (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">
                      No hay expedientes pendientes de revisión.
                    </p>
                  </div>
                )}

                {/* Contenido Principal */}
                {!loading && reports.length > 0 && (
                  <Row className="g-4">
                    {/* Columna Izquierda */}
                    <Col xs={12} md={7}>
                      {reporteSeleccionado && (
                        <div
                          className="d-flex flex-column gap-3"
                          style={{ height: "100%" }}
                        >
                          {/* Card principald del Detalle */}
                          <Card
                            style={{
                              border: "1px solid #f1f5f9",
                              borderRadius: "16px",
                              backgroundColor: "#ffffff",
                              padding: "1.5rem",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-3">
                              <div>
                                <span
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "0.75rem",
                                    color: "#64748b",
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  GESTIÓN DE EXPEDIENTE
                                </span>
                                <h4
                                  style={{
                                    fontWeight: "bold",
                                    color: "#0f172a",
                                    margin: "4px 0 0 0",
                                  }}
                                >
                                  #
                                  {reporteSeleccionado._id
                                    ?.substring(18)
                                    .toUpperCase()}
                                </h4>
                                <span
                                  style={{
                                    fontWeight: "700",
                                    color: "#6366f1",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {reporteSeleccionado.abuseType}
                                </span>
                              </div>
                              <div className="text-end">
                                <Badge
                                  style={getBadgeStyle(
                                    reporteSeleccionado.status || "RECIBIDO",
                                  )}
                                  className="px-3 py-2 rounded-pill font-weight-bold"
                                  bg=""
                                >
                                  {(
                                    reporteSeleccionado.status || "RECIBIDO"
                                  ).toUpperCase()}
                                </Badge>
                                <div
                                  className="text-muted mt-2"
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Registrado:{" "}
                                  {formatFecha(reporteSeleccionado.createdAt)}
                                </div>
                              </div>
                            </div>

                            {/* Ubicación */}
                            <div className="mb-3">
                              <span
                                style={{
                                  fontWeight: "700",
                                  fontSize: "0.75rem",
                                  color: "#94a3b8",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                UBICACIÓN REPORTADA
                              </span>
                              <p
                                style={{
                                  color: "#334155",
                                  fontWeight: "600",
                                  fontSize: "0.9rem",
                                  margin: "2px 0 0 0",
                                }}
                              >
                                {reporteSeleccionado.location
                                  ? `Zona ${reporteSeleccionado.location.zone} • ${reporteSeleccionado.location.reference || "Sin referencia"}`
                                  : "Ubicación no especificada"}
                              </p>
                            </div>

                            {/* Narrativa */}
                            <div>
                              <span
                                style={{
                                  fontWeight: "700",
                                  fontSize: "0.75rem",
                                  color: "#94a3b8",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                NARRATIVA DEL SUCESO
                              </span>
                              <p
                                style={{
                                  color: "#475569",
                                  fontSize: "0.85rem",
                                  lineHeight: "1.5",
                                  margin: "2px 0 0 0",
                                }}
                              >
                                {reporteSeleccionado.description}
                              </p>
                            </div>
                          </Card>

                          {/* Card para cambiar de estado */}
                          <Card
                            style={{
                              border: "1px solid #f1f5f9",
                              borderRadius: "16px",
                              backgroundColor: "#ffffff",
                              padding: "1.2rem 1.5rem",
                            }}
                          >
                            <h6
                              style={{
                                fontWeight: "800",
                                color: "#1e1b4b",
                                letterSpacing: "0.02em",
                              }}
                              className="d-flex align-items-center gap-2 mb-3"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-sliders"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v1z"
                                />
                              </svg>
                              CAMBIAR ESTADO DE DENUNCIA:
                            </h6>

                            {/* Botonera de acciones de actualización */}
                            <Row className="g-2 mb-4">
                              <Col xs={4}>
                                <Button
                                  variant={
                                    reporteSeleccionado.status?.toUpperCase() ===
                                    "RECIBIDO"
                                      ? "primary"
                                      : "outline-secondary"
                                  }
                                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-1"
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                  }}
                                  disabled={updatingId}
                                  onClick={() => handleStatusChange("RECIBIDO")}
                                >
                                  RECIBIDO
                                </Button>
                              </Col>
                              <Col xs={4}>
                                <Button
                                  variant={
                                    reporteSeleccionado.status?.toUpperCase() ===
                                    "SEGUIMIENTO"
                                      ? "warning"
                                      : "outline-secondary"
                                  }
                                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-1"
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    color:
                                      reporteSeleccionado.status?.toUpperCase() ===
                                      "SEGUIMIENTO"
                                        ? "white"
                                        : "",
                                  }}
                                  disabled={updatingId}
                                  onClick={() =>
                                    handleStatusChange("SEGUIMIENTO")
                                  }
                                >
                                  SEGUIMIENTO
                                </Button>
                              </Col>
                              <Col xs={4}>
                                <Button
                                  variant={
                                    reporteSeleccionado.status?.toUpperCase() ===
                                    "FINALIZADO"
                                      ? "success"
                                      : "outline-secondary"
                                  }
                                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-1"
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                  }}
                                  disabled={updatingId}
                                  onClick={() =>
                                    handleStatusChange("FINALIZADO")
                                  }
                                >
                                  FINALIZADO
                                </Button>
                              </Col>
                            </Row>

                            {/* Stepper Autoejecutado */}
                            {(() => {
                              const currentStatus = (
                                reporteSeleccionado.status || "RECIBIDO"
                              ).toUpperCase();
                              const pasoActual =
                                currentStatus === "FINALIZADO"
                                  ? 3
                                  : currentStatus === "SEGUIMIENTO"
                                    ? 2
                                    : 1;

                              return (
                                <div
                                  className="position-relative px-2 pt-2"
                                  style={{ minHeight: "50px" }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "16px",
                                      left: "12%",
                                      right: "12%",
                                      height: "3px",
                                      backgroundColor: "#e2e8f0",
                                      zIndex: 0,
                                    }}
                                  />
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "16px",
                                      left: "12%",
                                      width: `${pasoActual === 1 ? "0%" : pasoActual === 2 ? "38%" : "76%"}`,
                                      height: "3px",
                                      backgroundColor: "#6366f1",
                                      zIndex: 1,
                                      transition: "width 0.3s ease",
                                    }}
                                  />

                                  <div
                                    className="d-flex justify-content-between align-items-center position-relative"
                                    style={{ zIndex: 2 }}
                                  >
                                    {/* Nodo 1 */}
                                    <div className="d-flex flex-column align-items-center">
                                      <div
                                        style={{
                                          width: "26px",
                                          height: "26px",
                                          borderRadius: "50%",
                                          backgroundColor:
                                            pasoActual >= 1
                                              ? "#6366f1"
                                              : "#cbd5e1",
                                          color: "white",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        ✓
                                      </div>
                                      <span
                                        style={{
                                          fontSize: "0.65rem",
                                          fontWeight: "700",
                                          marginTop: "4px",
                                          color:
                                            pasoActual >= 1
                                              ? "#0f172a"
                                              : "#94a3b8",
                                        }}
                                      >
                                        Recibido
                                      </span>
                                    </div>
                                    {/* Nodo 2 */}
                                    <div className="d-flex flex-column align-items-center">
                                      <div
                                        style={{
                                          width: "26px",
                                          height: "26px",
                                          borderRadius: "50%",
                                          backgroundColor:
                                            pasoActual >= 2
                                              ? "#6366f1"
                                              : "#cbd5e1",
                                          color: "white",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        {pasoActual === 2 ? (
                                          <Spinner
                                            animation="border"
                                            style={{
                                              width: "10px",
                                              height: "10px",
                                              color: "white",
                                            }}
                                          />
                                        ) : (
                                          "•"
                                        )}
                                      </div>
                                      <span
                                        style={{
                                          fontSize: "0.65rem",
                                          fontWeight: "700",
                                          marginTop: "4px",
                                          color:
                                            pasoActual >= 2
                                              ? "#0f172a"
                                              : "#94a3b8",
                                        }}
                                      >
                                        Seguimiento
                                      </span>
                                    </div>
                                    {/* Nodo 3 */}
                                    <div className="d-flex flex-column align-items-center">
                                      <div
                                        style={{
                                          width: "26px",
                                          height: "26px",
                                          borderRadius: "50%",
                                          backgroundColor:
                                            pasoActual === 3
                                              ? "#6366f1"
                                              : "#cbd5e1",
                                          color: "white",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontSize: "0.7rem",
                                        }}
                                      >
                                        ⚑
                                      </div>
                                      <span
                                        style={{
                                          fontSize: "0.65rem",
                                          fontWeight: "700",
                                          marginTop: "4px",
                                          color:
                                            pasoActual === 3
                                              ? "#0f172a"
                                              : "#94a3b8",
                                        }}
                                      >
                                        Finalizado
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </Card>
                        </div>
                      )}
                    </Col>

                    {/* Columna derecha */}
                    <Col xs={12} md={5}>
                      <h6
                        className="mb-3"
                        style={{
                          fontWeight: "bold",
                          color: "#475569",
                          fontSize: "0.8rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        EXPEDIENTES REGISTRADOS
                      </h6>
                      <div
                        className="d-flex flex-column gap-2"
                        style={{
                          maxHeight: "68vh",
                          overflowY: "auto",
                          paddingRight: "4px",
                        }}
                      >
                        {reports.map((reporte) => {
                          const esSeleccionado =
                            reporteSeleccionado?._id === reporte._id;
                          const currentStatus = (
                            reporte.status || "RECIBIDO"
                          ).toUpperCase();

                          // Bordes de colores basados en el estado tal como en tu maqueta
                          const getBorderColor = () => {
                            if (esSeleccionado) return "#6366f1"; // Borde de foco principal
                            if (currentStatus === "FINALIZADO")
                              return "#e2e8f0";
                            if (currentStatus === "SEGUIMIENTO")
                              return "#e2e8f0";
                            return "#e2e8f0";
                          };

                          return (
                            <div
                              key={reporte._id}
                              onClick={() => setReporteSeleccionado(reporte)}
                              style={{
                                padding: "1rem 1.2rem",
                                borderRadius: "14px",
                                backgroundColor: esSeleccionado
                                  ? "#f8fafc"
                                  : "#ffffff",
                                border: `1.5px solid ${getBorderColor()}`,
                                borderWidth: esSeleccionado ? "2px" : "1.5px",
                                boxShadow: esSeleccionado
                                  ? "0 4px 12px rgba(99, 102, 241, 0.08)"
                                  : "none",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <span
                                    className="text-muted"
                                    style={{
                                      fontSize: "0.7rem",
                                      fontWeight: "600",
                                    }}
                                  >
                                    ID: #
                                    {reporte._id?.substring(18).toUpperCase()}
                                  </span>
                                  <h6
                                    style={{
                                      fontWeight: "800",
                                      color: "#1e293b",
                                      margin: "1px 0 0 0",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {reporte.abuseType}
                                  </h6>
                                </div>
                                <Badge
                                  style={getBadgeStyle(currentStatus)}
                                  className="px-2.5 py-1.5 rounded-pill font-weight-bold"
                                  bg=""
                                >
                                  {currentStatus}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
