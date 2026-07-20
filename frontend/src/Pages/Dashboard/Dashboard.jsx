import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

export const Dashboard = () => {
  const { getHistory, reports, loading, error } = UseReport();
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  const [nombre, setNombre] = useState(() => {
    return localStorage.getItem("nombreUsuario") || "Usuario";
  });

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      setReporteSeleccionado(reports[0]);
    }
  }, [reports]);

  // Función para definir los colores de las etiquetas de estado
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

  // Formatear fecha dd/mm/yyyy
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
      {/* Círculo Verde */}
      <div
        style={{
          position: "absolute",
          top: "-15vh",
          left: "-15vh",
          width: "45vh",
          height: "45vh",
          borderRadius: "50%",
          backgroundColor: "#34D399",
          opacity: "0.7",
          zIndex: 0,
        }}
      />

      {/* Círculo Azul */}
      <div
        style={{
          position: "absolute",
          bottom: "-15vh",
          right: "-15vh",
          width: "45vh",
          height: "45vh",
          borderRadius: "50%",
          backgroundColor: "#38BDF8",
          opacity: "0.7",
          zIndex: 0,
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
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
                {/* --- CABECERA DE LA CARD --- */}
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <h3
                      style={{ fontWeight: "800", color: "#0f172a", margin: 0 }}
                    >
                      Historial Reportes
                    </h3>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-3 mt-sm-0">
                    <span
                      className="text-muted d-none d-md-inline"
                      style={{ fontSize: "0.9rem", fontWeight: "600" }}
                    >
                      Hola, {nombre}
                    </span>
                    <Button
                      as={Link}
                      to="/report"
                      style={{
                        backgroundColor: "#10b981",
                        border: "none",
                        borderRadius: "50px",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                        padding: "0.6rem 1.2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                        />
                      </svg>
                      Nueva Denuncia
                    </Button>
                  </div>
                </div>

                {/* Estado de Carga / Error */}
                {loading && (
                  <div className="text-center py-5">
                    <Spinner
                      animation="border"
                      variant="success"
                      className="mb-2"
                    />
                    <p className="text-muted">
                      Cargando tus reportes confidenciales...
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

                {/* --- MOSTRAR MENSAJE SI NO HAY REPORTES EN LA BD --- */}
                {!loading && reports.length === 0 && !error && (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">
                      No has registrado ningún reporte todavía.
                    </p>
                  </div>
                )}

                {/* --- CONTENIDO PRINCIPAL --- */}
                {!loading && reports.length > 0 && (
                  <Row className="g-4">
                    {/* COLUMNA IZQUIERDA: DETALLE DEL REPORTE */}
                    <Col xs={12} md={7}>
                      {reporteSeleccionado && (
                        <Card
                          style={{
                            border: "1px solid #f1f5f9",
                            borderRadius: "16px",
                            backgroundColor: "#f8fafc",
                            padding: "1.5rem",
                            height: "100%",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <span
                                style={{
                                  fontWeight: "700",
                                  fontSize: "0.8rem",
                                  color: "#64748b",
                                }}
                              >
                                DENUNCIA SELECCIONADA
                              </span>
                              <h4
                                style={{
                                  fontWeight: "800",
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
                                  color: "#10b981",
                                  fontSize: "0.95rem",
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
                                {reporteSeleccionado.status || "RECIBIDO"}
                              </Badge>
                              <div
                                className="text-muted mt-2"
                                style={{ fontSize: "0.8rem" }}
                              >
                                Registrado:{" "}
                                {formatFecha(reporteSeleccionado.createdAt)}
                              </div>
                            </div>
                          </div>

                          {/* Ubicación */}
                          <div className="mt-4">
                            <span
                              style={{
                                fontWeight: "700",
                                fontSize: "0.8rem",
                                color: "#64748b",
                                letterSpacing: "0.05em",
                              }}
                            >
                              UBICACIÓN
                            </span>
                            <p
                              style={{
                                color: "#334155",
                                fontWeight: "600",
                                fontSize: "0.95rem",
                                margin: "4px 0 0 0",
                              }}
                            >
                              {reporteSeleccionado.location
                                ? `
                            ${reporteSeleccionado.location.municipality}, 
                            Zona ${reporteSeleccionado.location.zone} • 
                            ${reporteSeleccionado.location.reference || "Sin referencia extra"}`
                                : "Ubicación no especificada"}
                            </p>
                          </div>

                          {/* Descripción de hechos */}
                          <div className="mt-4 mb-5">
                            <span
                              style={{
                                fontWeight: "700",
                                fontSize: "0.8rem",
                                color: "#64748b",
                                letterSpacing: "0.05em",
                              }}
                            >
                              DESCRIPCIÓN DE HECHOS
                            </span>
                            <p
                              style={{
                                color: "#475569",
                                fontSize: "0.9rem",
                                lineHeight: "1.5",
                                margin: "4px 0 0 0",
                              }}
                            >
                              {reporteSeleccionado.description}
                            </p>
                          </div>

                          {/* Stepper (Linea de seguimiento) */}
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
                              <div className="mt-auto pt-3 border-top">
                                <div
                                  className="d-flex justify-content-between align-items-center position-relative px-3"
                                  style={{ minHeight: "60px" }}
                                >
                                  {/* Línea gris de fondo */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "25px",
                                      left: "10%",
                                      right: "10%",
                                      height: "4px",
                                      backgroundColor: "#e2e8f0",
                                      zIndex: 0,
                                    }}
                                  />
                                  {/* Línea verde activa */}
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "25px",
                                      left: "10%",
                                      width: `${pasoActual === 1 ? "0%" : pasoActual === 2 ? "40%" : "80%"}`,
                                      height: "4px",
                                      backgroundColor: "#10b981",
                                      zIndex: 1,
                                      transition: "width 0.3s ease",
                                    }}
                                  />

                                  {/* Recibido */}
                                  <div
                                    className="d-flex flex-column align-items-center"
                                    style={{ zIndex: 2 }}
                                  >
                                    <div
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                          pasoActual >= 1
                                            ? "#10b981"
                                            : "#cbd5e1",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                          "0 0 10px rgba(16, 185, 129, 0.2)",
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-check"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                      </svg>
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        marginTop: "8px",
                                        color:
                                          pasoActual >= 1
                                            ? "#0f172a"
                                            : "#64748b",
                                      }}
                                    >
                                      Recibido
                                    </span>
                                  </div>

                                  {/* Seguimiento */}
                                  <div
                                    className="d-flex flex-column align-items-center"
                                    style={{ zIndex: 2 }}
                                  >
                                    <div
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                          pasoActual >= 2
                                            ? "#10b981"
                                            : "#cbd5e1",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "4px solid #fff",
                                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                      }}
                                    >
                                      {pasoActual === 2 ? (
                                        <span
                                          className="spinner-border spinner-border-sm"
                                          style={{
                                            width: "12px",
                                            height: "12px",
                                            color: "white",
                                          }}
                                        />
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="12"
                                          fill="currentColor"
                                          className="bi bi-circle-fill"
                                          viewBox="0 0 16 16"
                                        >
                                          <circle cx="8" cy="8" r="8" />
                                        </svg>
                                      )}
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        marginTop: "8px",
                                        color:
                                          pasoActual >= 2
                                            ? "#0f172a"
                                            : "#64748b",
                                      }}
                                    >
                                      Seguimiento
                                    </span>
                                  </div>

                                  {/* Finalizado */}
                                  <div
                                    className="d-flex flex-column align-items-center"
                                    style={{ zIndex: 2 }}
                                  >
                                    <div
                                      style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                          pasoActual === 3
                                            ? "#10b981"
                                            : "#cbd5e1",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        className="bi bi-flag-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8.5l-.186-.464-.003-.001-.024-.009a12 12 0 0 0-.99-.33 16.6 16.6 0 0 0-2.4-.555c-1.395-.125-2.82.101-4.122.583l-.37.137-.309.113a11 11 0 0 1-.682.21 10.4 10.4 0 0 1-1.6.21 16.5 16.5 0 0 1-2.65-.15A14 14 0 0 1 .8 7.74M1.5 8.5a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0z" />
                                      </svg>
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        marginTop: "8px",
                                        color:
                                          pasoActual === 3
                                            ? "#0f172a"
                                            : "#64748b",
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
                      )}
                    </Col>

                    {/* Columna Derecha */}
                    <Col>
                      <h5
                        className="mb-3"
                        style={{
                          fontWeight: "700",
                          color: "#475569",
                          fontSize: "0.9rem",
                        }}
                      >
                        TUS DENUNCIAS REGISTRADAS
                      </h5>
                      <div
                        className="d-flex flex-column gap-2"
                        style={{
                          maxHeight: "65vh",
                          overflowY: "auto",
                          paddingRight: "4px",
                        }}
                      >
                        {reports.map((reporte) => {
                          const esSeleccionado =
                            reporteSeleccionado?._id === reporte._id;
                          return (
                            <div
                              key={reporte._id}
                              onClick={() => setReporteSeleccionado(reporte)}
                              style={{
                                padding: "1rem 1.2rem",
                                borderRadius: "14px",
                                backgroundColor: "#ffffff",
                                border: esSeleccionado
                                  ? "2px solid #34D399"
                                  : "1px solid #e2e8f0",
                                boxShadow: esSeleccionado
                                  ? "0 4px 12px rgba(52, 211, 153, 0.1)"
                                  : "none",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                if (!esSeleccionado) {
                                  e.currentTarget.style.borderColor = "#94a3b8";
                                  e.currentTarget.style.backgroundColor =
                                    "#f8fafc";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!esSeleccionado) {
                                  e.currentTarget.style.borderColor = "#e2e8f0";
                                  e.currentTarget.style.backgroundColor =
                                    "#ffffff";
                                }
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <span
                                    className="text-muted"
                                    style={{
                                      fontSize: "0.75rem",
                                      fontWeight: "600",
                                    }}
                                  >
                                    ID: #
                                    {reporte._id?.substring(18).toUpperCase()}
                                  </span>
                                  <h6
                                    style={{
                                      fontWeight: "bold",
                                      color: "#0f172a",
                                      margin: "2px 0 0 0",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {reporte.abuseType}
                                  </h6>
                                  <span
                                    className="text-muted"
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {formatFecha(reporte.createdAt)}
                                  </span>
                                </div>
                                <Badge
                                  style={getBadgeStyle(
                                    reporte.status || "RECIBIDO",
                                  )}
                                  className="px-2.5 py-1.5 rounded-pill font-weight-bold"
                                  bg=""
                                >
                                  {reporte.status || "RECIBIDO"}
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
