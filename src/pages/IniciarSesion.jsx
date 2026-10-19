import { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Text from '../components/atoms/Text';
import '../styles/Auth.css';

function IniciarSesion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, iniciarSesion } = useAuth();
  const [error, setError] = useState('');
  const [mensaje] = useState(location.state?.mensaje || '');

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nombreUsuario = formData.get('usuario').trim();
    const contrasena = formData.get('contrasena');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const encontrado = usuarios.find(
      (cuenta) => cuenta.usuario === nombreUsuario && cuenta.contrasena === contrasena,
    );

    if (!encontrado) {
      setError('Usuario o contraseña incorrectos. Si no tienes cuenta, regístrate.');
      return;
    }

    setError('');
    form.reset();
    iniciarSesion(encontrado.nombre);
    navigate('/');
  }

  return (
    <Container as="main" id="login" className="auth-page my-5">
      <Text type="h2">Inicio de sesión</Text>
      {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}
      {usuario && !mensaje && (
        <Alert variant="success" role="status">
          Sesión iniciada como {usuario}. <Link to="/">Ir al inicio</Link>
        </Alert>
      )}
      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="auth-form">
        <Form.Group controlId="login-username">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            autoComplete="username"
            placeholder="Ingresa tu nombre de usuario"
            minLength={3}
            maxLength={40}
            required
          />
        </Form.Group>

        <Form.Group controlId="login-password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasena"
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
            minLength={8}
            maxLength={40}
            required
          />
        </Form.Group>

        <Button type="submit" className="auth-submit">Iniciar sesión</Button>
      </Form>

      <Text className="auth-switch">
        ¿No tienes cuenta? <Link to="/registrarse">Regístrate</Link>
      </Text>
    </Container>
  );
}

export default IniciarSesion;
