import { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Registrarse() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nombre = formData.get('nombre').trim();
    const correo = formData.get('correo').trim().toLowerCase();
    const usuario = formData.get('usuario').trim();
    const contrasena = formData.get('contrasena');
    const confirmar = formData.get('confirmar');

    if (contrasena !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push({ nombre, correo, usuario, contrasena });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    navigate('/iniciarSesion', {
      state: { mensaje: `Registro exitoso. Bienvenido, ${nombre}! Ya puedes iniciar sesión.` },
    });
  }

  return (
    <Container as="main" id="register" className="auth-page my-5">
      <h2>Registro de usuario</h2>
      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="auth-form">
        <Form.Group controlId="register-name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            autoComplete="name"
            placeholder="Ingresa tu nombre"
            minLength={2}
            maxLength={30}
            required
          />
        </Form.Group>

        <Form.Group controlId="register-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            required
          />
        </Form.Group>

        <Form.Group controlId="register-username">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="usuario"
            autoComplete="username"
            placeholder="Elige un nombre de usuario"
            minLength={3}
            maxLength={20}
            required
          />
        </Form.Group>

        <Form.Group controlId="register-password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasena"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
          />
        </Form.Group>

        <Form.Group controlId="register-password-confirm">
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmar"
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
            minLength={8}
            required
          />
        </Form.Group>

        <Button type="submit" className="auth-submit">Registrar</Button>
      </Form>

      <p className="auth-switch">
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión</Link>
      </p>
    </Container>
  );
}

export default Registrarse;
