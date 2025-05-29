import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarCliente() {
  const { id } = useParams();
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', direccion: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/Clientes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 400) {
          alert('No autorizado. Inicia sesión.');
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          const cliente = data.find(c => c.id == id);
          if (cliente) setForm(cliente);
        }
      });
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/EditarCliente/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form),
    });

    if (res.status === 401 || res.status === 400) {
      alert('No autorizado. Inicia sesión.');
      navigate('/login');
      return;
    }
    navigate('/clientes');
  };
  return (
    <div className="form-container">
      <h2 className='titulo-negro'>EDITAR CLIENTE</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <div className='form-buttons'>
        <button className="btn" type="submit">Guardar Cambios</button>
        <button className="btn btn-cancel" type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditarCliente;
