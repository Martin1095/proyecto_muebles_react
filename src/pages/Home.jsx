import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../data/Products';
import ProductCard from '../components/organisms/ProductCard';
import Text from '../components/atoms/Text';

function Home() {
  const productosDestacados = products.filter(product => product.destacado);

  return (
    <>
      <Container className="my-5">
        <Text variant="h2" className="fw-bold">Bienvenido a nuestra tienda de muebles</Text>
        <Text variant="p">Encuentra los mejores muebles para tu hogar con buenos precios.</Text>
      </Container>

      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Text variant="h2" className="fw-bold m-0">Ofertas Destacadas</Text>
          <Link to="/products" className="btn btn-outline-dark btn-sm">
            Ver todos los productos
          </Link>
        </div>

        <Row>
          {productosDestacados.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;