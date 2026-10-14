import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Auth.css';

function IniciarSesion() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Container as="main" className="auth-page my-5">
      <h2>Inicio de sesión</h2>

      <Form onSubmit={handleSubmit} className="auth-form">
        <Form.Group controlId="login-username">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="login-password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Button type="submit" className="auth-submit">
          Iniciar sesión
        </Button>
      </Form>

      <p className="auth-switch">
        ¿No tienes cuenta? <Link to="/registrarse">Regístrate</Link>
      </p>
    </Container>
  );
}

export default IniciarSesion;