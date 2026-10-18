import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/Products";
import tutoriales from "../data/Tutoriales";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import Video from "../components/atoms/Video";

function TutorialDetail(){
    const { id } = useParams();
    const navigate = useNavigate();
    
    const product = products.find((p) => p.id === Number(id));
    const tutorial = tutoriales.find((t) => t.productId === Number(id));

    if (!product){
        return(
            <Container className="my-5">
                <Text variant="h1">
                    Mueble no encontrado
                </Text>

                <Button
                    variant="outline-dark"
                    onClick={() => navigate('/tutoriales')}
                >
                    Volver a tutoriales
                </Button>
            </Container>
        );
    }

    return(
        <Container as="main" className="my-5">
            <Button
                variant="outline-dark"
                className="mb-4"
                onClick={() => navigate('/tutoriales')}
            >
                Volver a tutoriales
            </Button>

            <Text variant="h1" className="fw-bold mb-4">
                Armado de {product.name}
            </Text>

            {tutorial && tutorial.videoId ?(
                <Video
                    videoId={tutorial.videoId}
                    title={"Armado de " + product.name}
                />
            ) : (
                <Text className="text-muted">
                    El video de este mueble estará disponible próximamente.
                </Text>
            )}

            <Text variant="h2" className="mt-4 mb-3">
                Pasos de armados
            </Text>

            {tutorial && tutorial.pasos.length > 0? (
                <ol>
                    {tutorial.pasos.map((paso, index) => (
                        <li key={index} className="mb-2">
                            {paso}
                        </li>
                    ))}
                </ol>
            ) : (
                <Text className="text-muted">
                    Las instrucciones de armado estarán disponibles próximamente.
                </Text>
            )}
        </Container>
    );
}

export default TutorialDetail;