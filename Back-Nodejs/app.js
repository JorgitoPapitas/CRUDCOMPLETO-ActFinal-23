const express = require('express')
const bodyParser = require('body-parser')
const clientes = require('./models/clientes') // Importar los modelos de las bd
const cors = require('cors') // para permitir conexiones desde el front
const app = express()
const puerto = 3000

app.use(cors())
app.use(bodyParser.json())

app.listen(puerto, () => {
    console.log('servicio iniciado...')
})

/////////////////////////////////CRUD PARA CLIENTES///////////////////////////////

// Agregar nuevo cliente
app.post('/AgregarCliente', async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;

    try {
        await clientes.create({ nombre, correo, telefono, direccion });
        res.status(201).send('Se ha agregado un cliente correctamente');
    } catch (error) {
        res.status(500).send('Error al intentar agregar al cliente');
    }
});

// Obtener los datos de los clientes
app.get('/Clientes', async (req, res) => {
    try {
        const data = await clientes.findAll();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error al obtener los datos de clientes');
    }
});

// Editar cliente existente con parametro de ruta de id
 app.put('/EditarCliente/:id', async (req, res) => {
    const { id } = req.params
    
    const { nombre, correo, telefono, direccion } = req.body
    const [filasActualizadas] = await clientes.update({ nombre, correo, telefono, direccion },
        { 
            where: {
                id 
            } 
        }
      )
    if (filasActualizadas > 0) {
        // se actualizó correctamente
        res.status(200).send('Se ha actualizado correctamente')    
      } else {
        // no existe ese id
        res.status(404).send('No existe el id proporcionado') 
    }
})

// Eliminar Clientes
app.delete('/EliminarCliente/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const filasEliminadas = await clientes.destroy({
      where: { id }
    });

    if (filasEliminadas > 0) {
      res.status(200).send('Cliente eliminado correctamente');
    } else {
      res.status(404).send('No se encontró el cliente con ese ID');
    }
  } catch (error) {
    res.status(500).send('Error al intentar eliminar el cliente');
  }
});

//////////////////////////////////////////////////////////////////////////////////