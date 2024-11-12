const insertarMiembro = "INSERT INTO miembros (nombre, apellido, titulacion, tecnologias, idiomas, proyectos_personales) VALUES (?, ?, ?, ?, ?, ?)";

// Ejemplo de inserción de un miembro
const valoresMiembro = ['Juan', 'Pérez', 'Ingeniero de Software', 'Node.js, Express, MySQL', 'Español, Inglés', 'Proyecto personal en GitHub'];
insertarDatos(insertarMiembro, valoresMiembro);
