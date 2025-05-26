import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="form-container22">
      <h2 className="h2-insano">Bienvenido a la Base de Datos Clientes</h2>
      <button className="btn22" onClick={() => navigate('/clientes')}>Ir a Clientes</button>
    </div>
  );
}

export default Home;