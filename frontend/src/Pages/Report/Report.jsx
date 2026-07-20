import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseReport } from "../../Shared/Hooks/UseReport";

export const Report = () => {
  const { error, loading, saveReport, success } = UseReport();

  // Estado local para los campos del formulario
  const [description, setDescription] = useState("");
  const [abuseType, setAbuseType] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [zone, setZone] = useState("");
  const [reference, setReference] = useState("");

  const navigate = useNavigate();
  const navigateToHist = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      description,
      abuseType,
      location: {
        municipality,
        zone: Number(zone),
        reference,
      },
      isAnonymous: true,
    };
    const result = await saveReport(reportData);
    if (result) {
      navigateToHist();
    }
  };

  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Archivo Seleccionado: ", file.name);
    }
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
                padding: "2.5rem",
              }}
            >
              <Card.Body className="p-0">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom">
                  <div>
                    <h2 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                      Formulario de Reporte Seguro
                    </h2>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.95rem", marginTop: "4px" }}
                    >
                      Ingresa los detalles bajo estricta confidencialidad.
                    </p>
                  </div>

                  <div>
                    <Badge
                      bg=""
                      style={{
                        backgroundColor: "#b9ddf5",
                        color: "#0369a1",
                        padding: "0.6rem 1rem",
                        borderRadius: "50px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-person-fill-lock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C8.077 9.043 6.972 9 6 9c-1.105 0-2 .895-2 2z" />
                        <path d="M9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm4-3a1 1 0 0 0-2 0v1h2z" />
                      </svg>
                      Usuario Anónimo / Cifrado
                    </Badge>
                  </div>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* Renderizado de errores provenientes del backend */}
                  {error && (
                    <div
                      className="alert alert-danger mb-4"
                      style={{ borderRadius: "10px" }}
                    >
                      {Array.isArray(error) ? error.join(", ") : error}
                    </div>
                  )}
                  <Row className="g-4">
                    {/* Columna Izquierda */}
                    <Col xs={12} md={6}>
                      {/* Tipo de Abuso */}
                      <Form.Group className="mb-4">
                        <Form.Label
                          style={{
                            fontWeight: "700",
                            fontSize: "0.8rem",
                            color: "#475569",
                            letterSpacing: "0.05em",
                          }}
                        >
                          TIPO DE ABUSO QUE SUFRIÓ
                        </Form.Label>
                        <Form.Select
                          name="abuseType"
                          value={abuseType}
                          onChange={(e) => setAbuseType(e.target.value)}
                          required
                          style={{
                            padding: "0.8rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option value="">Seleccione una opción</option>
                          <option value="ACOSO CALLEJERO">
                            Acoso Callejero
                          </option>
                          <option value="ACOSO ESCOLAR">Acoso Escolar</option>
                          <option value="CYBERACOSO">Cyberacoso</option>
                          <option value="VIOLENCIA FÍSICA">
                            Violencia Física
                          </option>
                          <option value="VIOLENCIA VERBAL">
                            Violencia Verbal
                          </option>
                          <option value="EXHIBICIONISMO">Exhibicionismo</option>
                          <option value="OTRO">Otro tipo de abuso</option>
                        </Form.Select>
                      </Form.Group>

                      {/* Ubicación de los Hechos */}
                      <Form.Group>
                        <Form.Label
                          style={{
                            fontWeight: "700",
                            fontSize: "0.8rem",
                            color: "#475569",
                            letterSpacing: "0.05em",
                          }}
                        >
                          UBICACIÓN DEL SUCESO
                        </Form.Label>
                        <Row className="g-2">
                          <Col xs={6}>
                            <Form.Select
                              value={municipality}
                              onChange={(e) => setMunicipality(e.target.value)}
                              required
                              style={{
                                padding: "0.8rem",
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1",
                              }}
                            >
                              <option value="">Municipio</option>
                              <option value="GUATEMALA">Guatemala</option>
                              <option value="MIXCO">Mixco</option>
                              <option value="VILLA NUEVA">Villa Nueva</option>
                            </Form.Select>
                          </Col>

                          <Col xs={6}>
                            <Form.Select
                              value={zone}
                              onChange={(e) => setZone(e.target.value)}
                              required
                              style={{
                                padding: "0.8rem",
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1",
                              }}
                            >
                              <option value="">Zona</option>
                              <option value="1">Zona 1</option>
                              <option value="9">Zona 9</option>
                              <option value="10">Zona 10</option>
                              <option value="11">Zona 11</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* Punto de Referencia */}
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          placeholder="Referencia (ej. esquina opuesta a comercial, casa verde)"
                          style={{
                            padding: "0.8rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            marginTop: "1vh",
                          }}
                        />
                      </Form.Group>

                      {/* Subir imagen de evidencia */}
                      <Form.Group className="mb-0">
                        <Form.Label
                          style={{
                            fontWeight: "700",
                            fontSize: "0.8rem",
                            color: "#475569",
                            letterSpacing: "0.05em",
                          }}
                        >
                          IMAGEN DE EVIDENCIA (OPCIONAL)
                        </Form.Label>
                        <div
                          onClick={handleDivClick}
                          style={{
                            border: "2px dashed #cbd5e1",
                            borderRadius: "12px",
                            padding: "1.8rem 1rem",
                            textAlign: "center",
                            backgroundColor: "#f8fafc",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#94a3b8";
                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }}
                        >
                          {/* Icono de subida */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="#64748b"
                            className="bi bi-image mb-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                          </svg>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: "600",
                              color: "#334155",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Arrastra una imagen aquí o búscala localmente
                          </p>
                          <span
                            style={{ fontSize: "0.75rem", color: "#64748b" }}
                          >
                            PNG, JPG de máximo 10MB
                          </span>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Columna Derecha */}
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex flex-column justify-content-between"
                    >
                      {/* Descripción detallada */}
                      <Form.Group className="mb-4">
                        <Form.Label
                          style={{
                            fontWeight: "700",
                            fontSize: "0.8rem",
                            color: "#475569",
                            letterSpacing: "0.05em",
                          }}
                        >
                          DESCRIPCIÓN DETALLADA DE LOS HECHOS
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          placeholder="Describe qué ocurrió, personas involucradas y cualquier detalle que facilite la resolución del caso..."
                          style={{
                            padding: "0.8rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            resize: "none",
                          }}
                        />
                      </Form.Group>

                      {/* Advertencia */}
                      <div
                        style={{
                          backgroundColor: "#fffbeb",
                          borderLeft: "4px solid #f59e0b",
                          borderRadius: "8px",
                          padding: "1rem",
                          marginBottom: "1.8rem",
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        {/* Icono de advertencia */}
                        <div style={{ color: "#d97706", marginTop: "2px" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-exclamation-triangle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                          </svg>
                        </div>
                        <div>
                          <h6
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: "700",
                              color: "#78350f",
                              margin: "0 0 4px 0",
                            }}
                          >
                            Declaración de honestidad
                          </h6>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: "#78350f",
                              margin: "0",
                              lineHeight: "1.4",
                            }}
                          >
                            Al enviar este reporte, certifico que los hechos
                            descritos son verídicos. Las denuncias falsas restan
                            prioridad a personas en peligro y pueden conllevar
                            sanciones legales.
                          </p>
                        </div>
                      </div>

                      {/* Botón de enviar */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-100 py-3"
                        style={{
                          backgroundColor: "#0d1925",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "700",
                          fontSize: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#1b2e41";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#0d1925";
                        }}
                      >
                        {/* Icono de Enviar */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-send-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                        </svg>
                        {loading
                          ? "Enviando..."
                          : "Enviar Denuncia Confidencial"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
