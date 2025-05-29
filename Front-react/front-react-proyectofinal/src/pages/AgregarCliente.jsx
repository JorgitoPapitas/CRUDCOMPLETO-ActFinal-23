import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AgregarCliente() {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', direccion: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3000/AgregarCliente', {
      method: 'POST',
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
      <h2 className='titulo-negro'>DAR DE ALTA UN CLIENTE</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <div className='form-buttons'>
        <button className="btn" type="submit">Guardar</button>
        <button className="btn btn-cancel" type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AgregarCliente;