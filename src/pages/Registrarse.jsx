import { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import Text from '../components/atoms/Text';

function Registrarse() {
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeExito(true);
  };

  return (
    <Container as="main" className="auth-page my-5">
      <Text variant="h2" className="mb-4">
        Registro de usuario
      </Text>

      {mensajeExito && (
        <Alert variant="success" className="mb-3">
          ¡Cuenta creada con éxito!.
        </Alert>
      )}

      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group controlId="register-name" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group controlId="register-email" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group controlId="register-password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Button type="submit" className="auth-submit w-100">
          Registrar
        </Button>
      </Form>

      <Text className="mt-3">
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión</Link>
      </Text>
    </Container>
  );
}

export default Registrarse;