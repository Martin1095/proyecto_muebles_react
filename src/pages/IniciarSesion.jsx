import { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Auth.css';

function IniciarSesion() {
  const location = useLocation();
  const [error, setError] = useState('');
  const [mensaje] = useState(location.state?.mensaje || '');
  const [signedIn, setSignedIn] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get('usuario').trim();
    const contrasena = formData.get('contrasena');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const encontrado = usuarios.find(
      (cuenta) => cuenta.usuario === usuario && cuenta.contrasena === contrasena,
    );

    if (!encontrado) {
      setError('Usuario o contraseña incorrectos. Si no tienes cuenta, regístrate.');
      return;
    }

    localStorage.setItem('sesion', encontrado.nombre);
    setError('');
    event.currentTarget.reset();
    setSignedIn(encontrado.nombre);
  }

  return (
    <Container as="main" id="login" className="auth-page my-5">
      <h2>Inicio de sesión</h2>
      {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}
      {signedIn && (
        <Alert variant="success" role="status">
          Sesión iniciada en este navegador como {signedIn}.
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
            maxLength={20}
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
            required
          />
        </Form.Group>

        <Button type="submit" className="auth-submit">Iniciar sesión</Button>
      </Form>

      <p className="auth-switch">
        ¿No tienes cuenta? <Link to="/registrarse">Regístrate</Link>
      </p>
    </Container>
  );
}

export default IniciarSesion;
