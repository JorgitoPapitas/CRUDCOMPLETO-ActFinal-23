import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Si no hay token, no renderices nada
  if (!token) return null;

  return children;
}

export default RutaProtegida;
