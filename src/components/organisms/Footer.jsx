import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Footer() {
    return (
    <footer className="bg-dark text-light py-4 mt-auto text-center">
        <Container>

        <p className="mb-2 text-white">© 2026 Tienda de Muebles</p>

        <div className="d-flex justify-content-center align-items-center gap-2">
            <Link to="/contact" className="text-warning text-decoration-none">
                Contacto
            </Link>
            <span className="text-warning">|</span>
            <Link to="/products" className="text-warning text-decoration-none">
                Catálogo
            </Link>
            <span className="text-warning">|</span>
            <Link to="/tutoriales" className="text-warning text-decoration-none">
                Tutoriales
            </Link>
        </div>
        </Container>
    </footer>
    );
}

export default Footer;