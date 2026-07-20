import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../Shared/Hooks/UseLogin";

export const RegistUser = () => {
  const { register, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    identification: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Validación básica antes de enviar
    if (Object.values(formData).some((value) => value.trim() === "")) {
      setValidationError("Todos los campos son obligatorios.");
      return;
    }

    const result = await register(formData);
    if (result) {
      // Si fue exitoso, redirigimos al login
      navigate("/");
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
        position:'relative',
        overflow:'hidden'
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

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={10} lg={8} xl={7}>
            <Card
              style={{
                borderRadius: "20px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                padding: "2rem",
              }}
            >
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                    <img
                      style={{ height: "4vh" }}
                      src="https://img.icons8.com/?size=100&id=ZdthOWHeUPYa&format=png&color=1A1A1A"
                      alt="Logo Voz Segura"
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        color: "#1a1a1a",
                      }}
                    >
                      Voz Segura
                    </span>
                  </div>
                  <h3 style={{ fontWeight: "bold", color: "#0d1925" }}>
                    Crear Cuenta
                  </h3>
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Regístrate para realizar y gestionar tus reportes con total
                    seguridad
                  </p>
                </div>

                {/* Mostrar errores del backend o validación */}
                {(error || validationError) && (
                  <Alert variant="danger" style={{ borderRadius: "10px" }}>
                    {validationError || error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* Columna Izquierda */}
                    <Col xs={12} md={6}>
                      {/* Nombres */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Nombres
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Escribe tus nombres"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* DPI */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          DPI
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="identification"
                          value={formData.identification}
                          onChange={handleChange}
                          placeholder="Escribe tu número de DPI"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* Teléfono */}
                      <Form.Group className="mb-3 mb-md-4">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Teléfono
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Escribe tu número de teléfono"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Columna Derecha */}
                    <Col xs={12} md={6}>
                      {/* Apellidos */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Apellidos
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          placeholder="Escribe tus apellidos"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* Fecha de Nacimiento */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Fecha de nacimiento
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* Género */}
                      <Form.Group className="mb-3 mb-md-4">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Género
                        </Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        >
                          <option value="">Selecciona tu género</option>
                          <option value="FEMENINO">Femenino</option>
                          <option value="MASCULINO">Masculino</option>
                          <option value="OTRO">Otro</option>
                          <option value="PREFIERO NO DECIRLO">
                            Prefiero no decirlo
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* 2 Espacios */}
                    <Col xs={12}>
                      {/* Correo */}
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Correo
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="correo@ejemplo.com"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* Contraseña */}
                      <Form.Group className="mb-4">
                        <Form.Label
                          style={{ fontWeight: "500", fontSize: "0.95rem" }}
                        >
                          Contraseña
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Escribe una contraseña segura"
                          style={{ padding: "0.7rem", borderRadius: "8px" }}
                        />
                      </Form.Group>

                      {/* Botón Regisrar */}
                      <Button
                        type="submit"
                        className="w-100 mb-4"
                        disabled={isLoading}
                        style={{
                          backgroundColor: "#0d1925",
                          border: "none",
                          padding: "0.8rem",
                          fontWeight: "600",
                          borderRadius: "10px",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#1b2e41";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#0d1925";
                        }}
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Registrar Cuenta"
                        )}
                      </Button>
                    </Col>
                  </Row>

                  {/* Enlace de Retorno */}
                  <div className="text-center">
                    <span style={{ color: "#63686c", fontSize: "0.9rem" }}>
                      ¿Ya tienes una cuenta?{" "}
                    </span>
                    <Link
                      to="/"
                      style={{
                        color: "#0284c7",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      Inicia sesión aquí
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
