import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../context/auth';

function NavBar() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <Navbar bg="warning" variant="light" expand="lg">
      <Container className="barra">
        <Navbar.Brand href="/">Tienda muebles</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/contact">Contacto</Nav.Link>
            <Nav.Link href="/tutoriales">Tutoriales</Nav.Link>
            <Nav.Link href="/carrito">Carrito</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {usuario ? (
              <>
                <Navbar.Text>Hola, {usuario}</Navbar.Text>
                <Nav.Link
                  as="button"
                  className="border-0 bg-transparent"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/iniciarSesion">Iniciar Sesión</Nav.Link>
                <Nav.Link href="/registrarse">Registrarse</Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

