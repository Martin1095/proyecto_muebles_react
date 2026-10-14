import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Auth.css';

function Registrarse() {
  return (
    <Container as="main" className="auth-page my-5">
      <h2>Registro de usuario</h2>

      <Form className="auth-form">
        <Form.Group controlId="register-name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group controlId="register-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group controlId="register-password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" />
        </Form.Group>

        <Button type="button" className="auth-submit">
          Registrar
        </Button>
      </Form>

      <p className="auth-switch">
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión</Link>
      </p>
    </Container>
  );
}

export default Registrarse;