const { DataTypes } = require('sequelize');
const sequelize = require('../conexion')

const clientes = sequelize.define('clientes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING, unique: true },
    telefono: { type: DataTypes.STRING, unique: true },
    direccion: { type: DataTypes.STRING }
}, {
    timestamps: false
})

module.exports = clientes;