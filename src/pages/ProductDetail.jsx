import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Form } from 'react-bootstrap';
import products from '../data/Products';
import Image from '../components/atoms/Image';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad] = useState(1);


  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="my-5 text-center">
        <Text variant="h2">Producto no encontrado</Text>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/productos')}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const handleAgregarCarrito = () => {
    alert(`Se agregaron ${cantidad} unidad(es) de "${product.name}" al carrito.`);
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
            ${product.price?.toLocaleString('es-CL') || product.price}
          </Text>

          <Text variant="p" className="text-muted mb-4">
            {product.description}
          </Text>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="flex-grow-1 mt-4">
              <Button
                variant="dark"
                className="w-100 py-2"
                onClick={handleAgregarCarrito}
              >
                Agregar al Carrito
              </Button>
            </div>
          </div>

          <div className="border-top pt-3 small text-muted">
            <p className="mb-1"> Garantía de 6 meses por defectos de fábrica.</p>
            <p className="mb-0"> Incluye manual de armado y kit de herramientas.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
