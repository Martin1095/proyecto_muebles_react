import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Form } from 'react-bootstrap';
import { useAuth } from '../context/auth';
import products from '../data/Products';
import Image from '../components/atoms/Image';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [cantidad, setCantidad] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container className="my-5 text-center">
        <Text variant="h2">Producto no encontrado</Text>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/products')}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const handleAgregarCarrito = () => {
    const cant = cantidad < 1 ? 1 : cantidad;
    const key = usuario ? `carrito_${usuario}` : 'carrito';
    const carrito = JSON.parse(localStorage.getItem(key)) || [];
    const existe = carrito.find((item) => item.id === product.id);

    if (existe) {
      existe.cantidad += cant;
    } else {
      carrito.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        cantidad: cant,
      });
    }

    localStorage.setItem(key, JSON.stringify(carrito));
    alert('Producto agregado al carrito');
  };

  return (
    <Container className="my-5">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>

      <Row className="bg-white p-4 rounded shadow-sm align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </Col>

        <Col md={6}>
          <Badge bg="success" className="mb-2">Disponible en stock</Badge>

          <Text variant="h2" className="fw-bold mb-2">
            {product.name}
          </Text>

          <Text variant="h3" className="text-primary fw-bold mb-3">
            ${product.price}
          </Text>

          <Text variant="p" className="text-muted mb-4">
            {product.description}
          </Text>

          <Form.Group className="mb-3" style={{ width: '120px' }}>
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value) || 1)}
            />
          </Form.Group>

          <Button
            variant="dark"
            className="w-100 py-2 mb-3"
            onClick={handleAgregarCarrito}
          >
            Agregar al Carrito
          </Button>

          <div className="border-top pt-3 small text-muted">
            <p className="mb-1">Garantía de 6 meses por defectos de fábrica.</p>
            <p className="mb-0">Incluye manual de armado y kit de herramientas.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;