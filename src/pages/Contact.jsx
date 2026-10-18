import { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import './Contact.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <Container as="main" className="contact-page my-5">
      <section className="contact-information" aria-labelledby="contact-title">
        <h1 id="contact-title">Contáctanos con:</h1>
        <p><strong>Correo:</strong> <a href="mailto:correo@muebles.com">correo@muebles.com</a></p>
        <p><strong>Correo de pedidos:</strong> <a href="mailto:infopedidos@muebles.com">infopedidos@muebles.com</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+56912345678">+56 9 1234 5678</a></p>
        <p><strong>Dirección:</strong> Av. Principal 123, Santiago, Chile</p>
        <p><strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 8:00 PM</p>
      </section>

      <section className="contact-message" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title">O escríbenos un mensaje</h2>
        {submitted && (
          <Alert variant="success" role="status">
            Formulario completado. Este sitio todavía no envía mensajes.
          </Alert>
        )}
        <Form onSubmit={handleSubmit} className="contact-form">
          <Form.Group controlId="contact-name">
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

          <Form.Group controlId="contact-email">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              autoComplete="email"
              placeholder="ejemplo@correo.com"
              required
            />
          </Form.Group>

          <Form.Group controlId="contact-message">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              name="mensaje"
              placeholder="Escribe tu mensaje aquí"
              rows={5}
              minLength={10}
              maxLength={500}
              required
            />
          </Form.Group>

          <Button type="submit" className="contact-submit">
            Enviar mensaje
          </Button>
        </Form>
      </section>
    </Container>
  );
}

export default Contact;