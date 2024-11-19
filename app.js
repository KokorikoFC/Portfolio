const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const sequelize = require("./config/db");
const Member = require("./models/Member");
const Project = require("./models/Project");

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static("public"));

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión a la base de datos establecida correctamente");
    })
    .catch((error) => {
        console.error("No se pudo conectar a la base de datos:", error);
    });


    const techImages = {
      JavaScript: '/img/Javascript.webp',
      'Node.js': '/img/node.png',
      React: '/img/coronel.webp',
      Python: '/img/coronel.webp',
      HTML: '/img/html.png',
      CSS: '/img/css.png',
      PHP: '/img/php.png',
    };


app.get("/", async (req, res) => {
    try {
        const members = await Member.findAll();
        const projects = await Project.findAll({
            where: { tipo: "grupo" },
            include: {
                model: Member,
                through: { attributes: [] },
            },
        });

        const plainMembers = members.map((member) =>
            member.get({ plain: true })
        );
        const plainProjects = projects.map((project) => {
            const plain = project.get({ plain: true });
            // Divide la cadena de tecnologías en un array y asigna imágenes
            if (plain.tecnologias) {
                plain.tecnologias = plain.tecnologias
                    .split(",")
                    .map((tech) => ({
                        name: tech.trim(),
                        image: techImages[tech.trim()] || "/img/coronel.webp",
                    }));
            }
            return plain;
        });

        console.log("Miembros enviados al cliente:", plainMembers);
        console.log("Proyectos enviados al cliente:", plainProjects);

        res.render("home", { members: plainMembers, projects: plainProjects });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al obtener datos");
    }
});

app.get("/memberPortfolio/:id", async (req, res) => {
    try {
        // Obtén el id del miembro de los parámetros de la URL
        const memberId = req.params.id;

        // Busca el miembro en la base de datos usando Sequelize
        const member = await Member.findByPk(memberId);
        const projects = await Project.findAll({
          where: { tipo: "individual" },
          include: {
              model: Member,
              through: { attributes: [] },
          },
      });

        if (member) {
          // Si el miembro existe, obtenemos los datos del miembro
          const memberData = member.get({ plain: true });
    
          // Si el miembro tiene tecnologías definidas, las procesamos
          if (memberData.tecnologias) {
            memberData.tecnologias = memberData.tecnologias.split(',').map(tech => ({
              name: tech.trim(),
              image: techImages[tech.trim()] || '/img/default-tech.png', // Imagen predeterminada si no hay
            }));
          }
    
          // Renderizamos la vista 'memberPortfolio' pasando los datos del miembro
          res.render("memberPortfolio", {
            member: memberData
          });
        } else {
          res.status(404).send("Miembro no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el miembro:", error);
        res.status(500).send("Error al obtener el miembro");
    }
});

// Sincronizar la base de datos y las tablas
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas correctamente");
    })
    .catch((error) => {
        console.error("Error al sincronizar las tablas:", error);
    });

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
