// Dependencias necesarias
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const sequelize = require('./config/db'); // Conexión a la base de datos
const Member = require('./models/Member'); // El modelo de Miembro

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Definimos la carpeta de vistas

// Middleware para JSON (si necesitas procesar JSON)
app.use(express.json());

// Configura Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public/css'));

// Conectar a la base de datos usando Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

// Ruta principal para mostrar todos los miembros en la página principal
app.get('/', async (req, res) => {
  try {
    // Obtener todos los miembros desde la base de datos
    const members = await Member.findAll();
    const plainMembers = members.map(member => member.get({ plain: true }));

    // Verifica en la terminal que los miembros están siendo recuperados correctamente
    console.log("Miembros enviados al cliente:", plainMembers); // Verificar los datos

    // Renderizar la vista 'home' y pasar los miembros
    res.render('home', { members: plainMembers });
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    res.status(500).send('Error al obtener los miembros');
  }
});

// Sincronizar la base de datos y las tablas
sequelize.sync({ force: false }) // Usar `force: true` solo si deseas reiniciar las tablas (Cuidado)
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
