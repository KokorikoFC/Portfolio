app.get('/memberPortfolio/:id', async (req, res) => {
  try {
    // Obtén el id del miembro de los parámetros de la URL
    const memberId = req.params.id;
    
    // Busca el miembro en la base de datos usando Sequelize
    const member = await Member.findByPk(memberId);
    
    if (member) {
      // Si el miembro existe, renderiza la vista 'memberPortfolio' y pasa los datos del miembro
      res.render('memberPortfolio', { member: member.get({ plain: true }) });
    } else {
      // Si no se encuentra el miembro, envía un error 404
      res.status(404).send('Miembro no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el miembro:', error);
    res.status(500).send('Error al obtener el miembro');
  }
});