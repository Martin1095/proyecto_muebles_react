import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productsDestacados from '../data/ProductsDestacados';
import ProductDestacadoCard from '../components/organisms/ProductDestacadoCard';
import Text from '../components/atoms/Text';

function Home() {

  const productosDestacados = productsDestacados.slice(0, 3);

  return (
    <>
      <Container className="my-5">
        <Text variant="h2" className="fw-bold">Bienvenido a nuestra tienda de muebles</Text>
        <Text variant="p"> Encuentra los mejores muebles para tu hogar con buenos precios.</Text>
      </Container>

      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Text variant="h2" className="fw-bold m-0">
            Ofertas Destacadas
          </Text>
          <Link to="/products" className="btn btn-outline-dark btn-sm">
            Ver todos los productos
          </Link>
        </div>

        <Row>
          {productosDestacados.map((productDestacado) => (
            <Col key={productDestacado.id} xs={12} md={6} lg={4} className="mb-4">
              <ProductDestacadoCard productDestacado={productDestacado} />
            </Col>
          ))}
        </Row>
      </Container>

    </>
  );
}

export default Home;