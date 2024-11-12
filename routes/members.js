const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// Ruta para la página principal (listado de miembros)
router.get('/', membersController.list);

// Ruta para la página de un miembro específico
router.get('/:id', membersController.profile);

module.exports = router;
