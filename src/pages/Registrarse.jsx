import { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import Text from '../components/atoms/Text';

function Registrarse() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito(false);

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario.trim(),
          correo: correo.trim(),
          contrasena: contrasena,
          rol: 'CLIENTE',
        }),
      });

      if (!response.ok) {
        setError('No se pudo registrar el usuario.');
        return;
      }

      setMensajeExito(true);
      setTimeout(() => {
        navigate('/iniciarSesion');
      }, 1500);
    } catch {
      setError('No se pudo conectar con el servidor. Verifica que el backend esté activo.');
    }
  };

  return (
    <Container as="main" className="auth-page my-5">
      <Text variant="h2" className="mb-4">
        Registro de usuario
      </Text>

      {mensajeExito && (
        <Alert variant="success" className="mb-3">
          ¡Cuenta creada con éxito! Redirigiendo...
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group controlId="register-name" className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            minLength={3}
            maxLength={40}
            required
          />
        </Form.Group>

        <Form.Group controlId="register-email" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="register-password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            minLength={8}
            maxLength={40}
            required
          />
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