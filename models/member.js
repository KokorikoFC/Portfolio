
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
  foto: {
    type: DataTypes.STRING,
  },
  presentacion: {
    type: DataTypes.TEXT,
  },
  tecnologias: {
    type: DataTypes.TEXT,
  },
  estudios: {
    type: DataTypes.TEXT,
  },
  idiomas: {
    type: DataTypes.STRING,
  },
  proyectos_personales: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'Members',
  timestamps: true,
});



module.exports = Member;
