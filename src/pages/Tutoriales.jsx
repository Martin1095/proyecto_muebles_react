import { Container, Row, Col } from "react-bootstrap";
import Products from '../data/Products'
import Text from '../components/atoms/Text'
import TutorialCard from '../components/organisms/TutorialCard'

function Tutoriales(){
  return(
    <Container as="main" className="my-5">
        <Text variant="h1" className="fw-bold mb-3">
          Tutoriales de armados
        </Text>

        <Text variant="p" className="text-muted mb-4">
          Selecciona un mueble para consultar su tutorial de armado.
        </Text>

        <Row className="g-4">
          {Products.map((product) =>(
            <Col key={product.id} xs={12} md={6} lg={4}>
              <TutorialCard product={product}/>
            </Col>
          ))}
        </Row>
    </Container>
  );
}

export default Tutoriales;