const Member = require('../models/member'); // Importar el modelo

const membersController = {
  // Mostrar la lista de todos los miembros (home)
  async list(req, res) {
    try {
      const members = await Member.getAll();  // Obtener todos los miembros de la base de datos
      res.render('home', { members });  // Renderizar la plantilla home.handlebars y pasar los miembros
    } catch (error) {
      res.status(500).send("Error al obtener los miembros");
    }
  },

  // Mostrar el perfil de un miembro específico
  async profile(req, res) {
    try {
      const member = await Member.getById(req.params.id);  // Obtener un miembro por su ID
      if (member) {
        res.render('member', { member });  // Renderizar la plantilla member.handlebars
      } else {
        res.status(404).send("Miembro no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al obtener el miembro");
    }
  }
};

module.exports = membersController;
