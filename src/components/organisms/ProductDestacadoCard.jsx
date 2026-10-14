import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';


function ProductDestacadoCard({ productDestacado }) {
  const navigate = useNavigate();


  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Image src={productDestacado.image} alt={productDestacado.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={productDestacado.name}
          description={productDestacado.description}
          price={productDestacado.price}
        />
        <Button variant="primary" onClick={() => navigate(`/products/${productDestacado.id}`)}>
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}


export default ProductDestacadoCard;
