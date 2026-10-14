
import { Container,  Card } from 'react-bootstrap';


function Tutoriales(Title, Description, Image) {
  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={Title}
          description={Description}
        />
        <Link to="/tutorialVelador" className="btn btn-outline-dark btn-sm">
          haz clic aquí para ver los pasos
        </Link>
      </Card.Body>
    </Card>
  );
}



export default Tutoriales;
