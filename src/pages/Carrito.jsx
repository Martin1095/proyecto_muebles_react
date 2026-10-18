import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function Carrito() {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (id, cambio) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + cambio;
        return { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
      }
      return item;
    });
    actualizarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    actualizarCarrito([]);
  };

  const realizarCompra = () => {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    const nuevoPedido = {
      id: pedidosGuardados.length > 0
        ? pedidosGuardados[pedidosGuardados.length - 1].id + 1
        : 1,
      cliente: 'Cliente',
      fecha: new Date().toLocaleDateString('es-CL'),
      productos: carrito
        .map((item) => `${item.name} (x${item.cantidad})`)
        .join(', '),
      total,
      estado: 'Pendiente'
    };

    localStorage.setItem('pedidos', JSON.stringify([...pedidosGuardados, nuevoPedido]));
    vaciarCarrito();
    alert('¡Compra realizada con éxito! El pedido ya aparece en administración.');
  };


  const total = carrito.reduce((suma, item) => suma + (item.price * item.cantidad), 0);

  return (
    <Container className="my-5">
      <Text variant="h2" className="mb-4">Carrito de Compras</Text>

      {carrito.length === 0 ? (
        <Text variant="p">No hay productos en el carrito.</Text>
      ) : (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => cambiarCantidad(item.id, -1)}
                    >
                      -
                    </Button>
                    <span className="mx-3">{item.cantidad}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => cambiarCantidad(item.id, 1)}
                    >
                      +
                    </Button>
                  </td>
                  <td>${item.price * item.cantidad}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mt-4">
            <Text variant="h4">Total: ${total}</Text>
            <div className="d-flex gap-2 mt-3">
              <Button variant="danger" onClick={vaciarCarrito}>
                Vaciar Carrito
              </Button>
              <Button
                variant="success"
                onClick={realizarCompra}
              >
                Comprar
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;