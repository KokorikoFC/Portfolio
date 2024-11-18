// models/Project.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Member = require('./Member'); 

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tecnologias: {
    type: DataTypes.STRING,
  },
  empresa: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.ENUM('individual', 'grupo'),
  },
  url: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'proyectos', 
  timestamps: false,
});

/*
Project.belongsToMany(Member, { through: 'member_proyectos' });
Member.belongsToMany(Project, { through: 'member_proyectos' });
*/

module.exports = Project;
