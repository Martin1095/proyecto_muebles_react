import { useState, useEffect } from 'react';
import { Alert, Button, Container, Table } from 'react-bootstrap';
import { useAuth } from '../context/auth';

function Admin() {
  const { rol, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarPedidos() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/pedidos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPedidos(data);
        } else {
          setError('No se pudieron cargar los pedidos.');
        }
      } catch {
        setError('Error al conectar con el servidor.');
      }
    }

    cargarPedidos();
  }, [token]);

  const cancelarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/pedidos/${id}/cancelar`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const pedidosActualizados = pedidos.map((pedido) => {
          if (pedido.id === id) {
            return { ...pedido, estado: 'Cancelado' };
          }
          return pedido;
        });

        setPedidos(pedidosActualizados);
      } else {
        setError('No se pudo cancelar el pedido.');
      }
    } catch {
      setError('Error al conectar con el servidor.');
    }
  };

  return (
    <Container className="my-5">
      <h1>Administrar pedidos</h1>
      <p>Pedidos realizados por los clientes.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {pedidos.length === 0 && !error && <Alert variant="info">No hay pedidos registrados.</Alert>}

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
              {rol === 'ADMIN' && <th>Acción</th>}
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
                {rol === 'ADMIN' && (
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
                )}
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