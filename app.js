const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const sequelize = require('./config/db');
const Member = require('./models/Member'); 
const Project = require('./models/Project'); 

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());

app.use(express.static('public'));

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

  
app.get('/', async (req, res) => {
  try {
    const members = await Member.findAll(); 
    const projects = await Project.findAll({
      include: {
        model: Member, 
        through: { attributes: [] }  
      }
    });

    const plainMembers = members.map(member => member.get({ plain: true }));
    const plainProjects = projects.map(project => project.get({ plain: true }));

    console.log("Miembros enviados al cliente:", plainMembers);
    console.log("Proyectos enviados al cliente:", plainProjects);

    res.render('home', { members: plainMembers, projects: plainProjects });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener datos');
  }
});




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
      res.status(404).send('Miembro no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el miembro:', error);
    res.status(500).send('Error al obtener el miembro');
  }
});

// Sincronizar la base de datos y las tablas
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
