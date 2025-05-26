// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import AgregarCliente from './pages/AgregarCliente';
import EditarCliente from './pages/EditarCliente';

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
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/agregar" element={<AgregarCliente />} />
        <Route path="/editar/:id" element={<EditarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
