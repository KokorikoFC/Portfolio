const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titulacion: {
    type: DataTypes.STRING,
  },
  tecnologias: {
    type: DataTypes.TEXT, // Usa TEXT para almacenar múltiples tecnologías en un solo campo
  },
  idiomas: {
    type: DataTypes.STRING,
  },
  proyectos_personales: {
    type: DataTypes.TEXT, // Usa TEXT para almacenar una descripción o lista de proyectos personales
  },
}, {
  tableName: 'Members', // Nombre de la tabla en la base de datos (opcional si coincide)
  timestamps: true,     // Sequelize generará automáticamente `createdAt` y `updatedAt`
});

module.exports = Member;
