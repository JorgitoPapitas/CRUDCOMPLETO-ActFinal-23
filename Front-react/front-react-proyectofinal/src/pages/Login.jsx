import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password }),
    });

    if (res.ok) {
      const token = await res.text();
      localStorage.setItem('token', token);
      navigate('/clientes');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="form-container">
      <h2 className="titulo-negro">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button className="btn" type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
