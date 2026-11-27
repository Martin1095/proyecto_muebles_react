import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Text from '../components/atoms/Text';

function Carrito() {
  const { usuario, token } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const key = usuario ? `carrito_${usuario}` : 'carrito';

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem(key)) || [];
    setCarrito(guardado);
  }, [key]);

  const guardarCarrito = (lista) => {
    setCarrito(lista);
    localStorage.setItem(key, JSON.stringify(lista));
  };

  const cambiarCantidad = (id, cambio) => {
    const nuevo = carrito
      .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + cambio } : item))
      .filter((item) => item.cantidad > 0);
    guardarCarrito(nuevo);
  };

  const eliminar = (id) => {
    guardarCarrito(carrito.filter((item) => item.id !== id));
  };

  const total = carrito.reduce((suma, item) => suma + item.price * item.cantidad, 0);

  const finalizarCompra = async () => {
    setError('');
    setMensaje('');

    if (!usuario || !token) {
      setError('Inicia sesión para poder comprar.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/v1/boletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario,
          total,
          detalles: carrito.map((item) => ({
            productoId: item.id,
            nombreProducto: item.name,
            cantidad: item.cantidad,
            precioUnitario: item.price,
          })),
        }),
      });

      if (!res.ok) {
        setError('Error al generar la boleta.');
        return;
      }

      guardarCarrito([]);
      setMensaje('Compra realizada con éxito.');
    } catch {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <Container as="main" className="my-5">
      <Text variant="h2" className="mb-4">
        Carrito de Compras
      </Text>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {carrito.length === 0 ? (
        <div>
          <Text>Tu carrito está vacío.</Text>
          <Button as={Link} to="/products" variant="primary" className="mt-2">
            Ver productos
          </Button>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toLocaleString('es-CL')}</td>
                  <td>
                    <Button size="sm" variant="outline-secondary" onClick={() => cambiarCantidad(item.id, -1)}>
                      -
                    </Button>
                    <span className="mx-2">{item.cantidad}</span>
                    <Button size="sm" variant="outline-secondary" onClick={() => cambiarCantidad(item.id, 1)}>
                      +
                    </Button>
                  </td>
                  <td>${(item.price * item.cantidad).toLocaleString('es-CL')}</td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => eliminar(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Text variant="h4">Total: ${total.toLocaleString('es-CL')}</Text>
            <Button variant="success" size="lg" onClick={finalizarCompra}>
              Finalizar Compra
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;