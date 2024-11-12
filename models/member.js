const pool = require('../config/db'); // Conexión a la base de datos

const Member = {
  // Obtener todos los miembros
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM members');
    return rows;
  },
  
  // Obtener un miembro por su ID
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [id]);
    return rows[0]; // Retornamos el primer miembro que coincida
  }
};

module.exports = Member;

