import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import AgregarCliente from './pages/AgregarCliente';
import EditarCliente from './pages/EditarCliente';
import Login from './pages/Login';
import RutaProtegida from './componente/ProtegerRuta';

function App() {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/Clientes')
      .then(res => res.json())
      .then(data => {
        console.log('data desde API:', data);
        setClientes(data);
      });
  }, []); 

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/clientes"
          element={
        <RutaProtegida>
          <Clientes />
        </RutaProtegida>
      }
    />
      <Route
        path="/agregar"
        element={
        <RutaProtegida>
          <AgregarCliente />
        </RutaProtegida>
      }
    />
      <Route
        path="/editar/:id"
        element={
        <RutaProtegida>
          <EditarCliente />
        </RutaProtegida>
      }
    />
    </Routes>
  </BrowserRouter>
  )
}

export default App;