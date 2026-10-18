import { useState } from 'react';
import { Alert, Button, Container, Table } from 'react-bootstrap';

function Admin() {
  const [pedidos, setPedidos] = useState(() => {
    const pedidosGuardados = localStorage.getItem('pedidos');

    if (pedidosGuardados) {
      return JSON.parse(pedidosGuardados);
    }

    return [];
  });

  const cancelarPedido = (id) => {
    const pedidosActualizados = pedidos.map((pedido) => {
      if (pedido.id === id) {
        return { ...pedido, estado: 'Cancelado' };
      }

      return pedido;
    });

    setPedidos(pedidosActualizados);
    localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
  };

  return (
    <Container className="my-5">
      <h1>Administrar pedidos</h1>
      <p>Pedidos realizados desde el carrito en este navegador.</p>

      {pedidos.length === 0 && <Alert variant="info">No hay pedidos registrados.</Alert>}

      {pedidos.length > 0 && (
        <Table bordered hover>
          <thead>
            <tr>
              <th>N.º</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
              <th>Aviso al cliente</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.productos}</td>
                <td>${pedido.total}</td>
                <td>{pedido.estado}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={pedido.estado === 'Cancelado'}
                    onClick={() => cancelarPedido(pedido.id)}
                  >
                    Cancelar
                  </Button>
                </td>
                <td>
                  {pedido.estado === 'Cancelado' && (
                    <Alert variant="warning" className="mb-0">
                      Lamentablemente tuvimos que cancelar su pedido. Si tiene
                      alguna duda, escríbanos a infopedidos@muebles.com.
                    </Alert>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Admin;
