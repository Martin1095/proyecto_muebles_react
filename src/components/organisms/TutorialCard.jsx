import { Card } from "react-bootstrap";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import TutorialBody from "../molecules/TutorialBody";
import { useNavigate } from "react-router-dom";

function TutorialCard({ product }){
    const navigate = useNavigate();

    return(
        <Card className="h-100">
            <Image
              src={product.image}
              alt={product.name}
              className={"card-img-top"}          
            />
            <Card.Body className="d-flex flex-column">
                <TutorialBody
                    title={product.name}
                    description="Consulta el video y los pasos de armado de este mueble."
                />

                <Button
                    variant="outline-dark"
                    className="mt-auto"
                    onClick={() => navigate("/Tutoriales/" + product.id)}
                >
                    ver tutorial
                </Button>
            </Card.Body>
        </Card>
    );
}

export default TutorialCard;