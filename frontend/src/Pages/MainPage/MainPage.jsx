import React, { useState } from "react";
import {
  Card,
  Nav,
  Button,
  Badge,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLogin } from "../../Shared/Hooks/UseLogin";

export const MainPage = () => {
  const { isLoading, login } = useLogin();

  // Estado del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Manejador de Cambios
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador del envío de credenciales
  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  const navigate = useNavigate();
  const navigateToRegistUser = () => {
    navigate("/regist");
  };

  return (
    <div>
      <Card style={{ margin: "3vh" }}>
        <Card.Header>
          <Nav
            variant="underline"
            defaultActiveKey="#first"
            className="d-flex w-100 align-items-center"
            style={{ "--bs-nav-underline-link-active-color": "#1ab780" }}
          >
            <div
              className="me-auto"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img
                  style={{ height: "4vh" }}
                  src="https://img.icons8.com/?size=100&id=ZdthOWHeUPYa&format=png&color=0eb780"
                />
                <Nav.Item className="navbar-brand">Voz Segura</Nav.Item>
              </div>
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ gap: "3vh" }}
            >
              <Nav.Item>
                <Nav.Link href="#first">Sobre Nosotros</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#reportar">Cómo Reportar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#preguntas">Preguntas Frecuentes</Nav.Link>
              </Nav.Item>
            </div>

            <div className="ms-auto">
              <Button
                as={Link}
                to="/report"
                style={{
                  backgroundColor: "#34D399",
                  border: "none",
                  padding: "0.7rem",
                  fontWeight: "600",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#25986e";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#34D399";
                }}
              >
                Reporte Anónimo
              </Button>
            </div>
          </Nav>
        </Card.Header>
      </Card>

      <Container fluid className="px-0">
        <Row
          className="align-items-center ps-md-5 pe-md-5 mx-0"
          style={{ minHeight: "80vh" }}
        >
          {/* Mitad Izquierda */}
          <Col xs={12} md={6} className="mb-5 mb-md-0">
            <Badge
              bg=""
              style={{ backgroundColor: "#def4ff", color: "#436e90" }}
            >
              TU ESPACIO SEGURO
            </Badge>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                lineHeight: "1.2",
                marginBottom: "2vh",
                color: "#1a1a1a",
              }}
            >
              Protegemos tu identidad, apoyamos tu valentía
            </div>

            <div
              style={{
                color: "#63686c",
                fontSize: "1.1rem",
                marginBottom: "2vh",
              }}
            >
              Nuestra misión es prover un canal totalmente encriptado para la
              denuncia de conductas inapropiadas, acoso y hostigamiento.
              Diseñamos con un enfoque centrado en la víctima para asegurar un
              proceso rápido, guiado y 100% confidencial.
            </div>

            <div
              style={{
                color: "#63686c",
                fontSize: "1.1rem",
                marginBottom: "3vh",
              }}
            >
              <span style={{ fontWeight: "bold" }}>tú decides: </span>
              Denuncia con tu cuenta o de forma completamente anónima.
            </div>
          </Col>

          {/* Midad Derecha */}
          <Col xs={12} md={5} className="offset-md-1">
            <div
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "20px",
                minHeight: "50vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                boxShadow: "rem",
                //border:'2px dashed #dee2e6'
              }}
            >
              {/* círculo verde */}
              <div
                style={{
                  position: "absolute",
                  top: "-10vh",
                  left: "-10vh",
                  width: "30vh",
                  height: "30vh",
                  borderRadius: "50%",
                  backgroundColor: "#34D399",
                  opacity: "0.8",
                }}
              />

              {/* Círculo Celeste */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-10vh",
                  right: "-10vh",
                  width: "30vh",
                  height: "30vh",
                  borderRadius: "50%",
                  backgroundColor: "#38BDF8",
                  opacity: "0.8",
                }}
              />

              {/* Form Login */}
              <div
                style={{
                  position: "relative",
                  zIndex: "10",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  padding: "2.5rem",
                  width: "100%",
                  maxWidth: "400px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-center" style={{ fontWeight: "bold" }}>
                  Ingreso Seguro
                </h3>
                <p
                  className="text-center text-muted"
                  style={{ fontSize: "0.95rem" }}
                >
                  Accede para dar seguimiento a tus reportes guardados
                </p>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Ingresa tu correo"
                      value={formData.email}
                      onChange={onChangeValue}
                      required
                    />
                    <Form.Text className="text-muted">
                      No compartiremos tu correo con nadie.
                    </Form.Text>
                  </Form.Group>
                  <br />
                  <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={onChangeValue}
                      required
                    />
                  </Form.Group>

                  <br />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-100 mb-4"
                    style={{
                      backgroundColor: "#0d1925",
                      border: "none",
                      padding: "0.7rem",
                      fontWeight: "600",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#1b2e41";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#0d1925";
                    }}
                  >
                    Acceder al Portal
                  </Button>

                  <div className="text-center">
                    <span style={{ color: "#63686c", fontSize: "0.9rem" }}>
                      ¿No tienes una cuenta?{" "}
                    </span>
                    <Link
                      to="/regist"
                      style={{
                        color: "#0284c7",
                        fontWeight: "600",
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
                      Regístrate aquí
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
