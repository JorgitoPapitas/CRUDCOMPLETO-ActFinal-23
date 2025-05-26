import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Clientes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/Clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
  }, [location]);

  const eliminarCliente = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este cliente?')) {
      const res = await fetch(`http://localhost:3000/EliminarCliente/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Cliente eliminado!!');
        // Recargar la lista sin recargar toda la página:
        const nuevosClientes = clientes.filter((c) => c.id !== id);
        setClientes(nuevosClientes);
      }
    }
  };

  return (
    <div className="tabla-container">
        <div className='btn-volver'><button className="btn-volver" onClick={() => navigate('/')}>Regresar</button></div>
      <h2 className='h2-insano'>Lista de Clientes</h2>
      <button className="btn" onClick={() => navigate('/agregar')}>Dar de Alta</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Modificar Cliente</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.correo}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion}</td>
              <td className='td-maestro'>
                <div className='form-buttons22'>
                <button className="btn btn-edit" onClick={() => navigate(`/editar/${item.id}`)}>Editar</button>
                <button className="btn btn-delete" onClick={() => eliminarCliente(item.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
