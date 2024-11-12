const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();  // Para cargar las variables de entorno

// Rutas
const membersRoutes = require('./routes/members');

const app = express();

// Configurar el motor de plantillas Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar las solicitudes con datos JSON y urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para la página principal (home)
app.get('/', (req, res) => {
  res.render('home');  // Renderiza la plantilla home.handlebars
});

// Definir las rutas para los miembros
app.use('/members', membersRoutes);

// Configurar el puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
