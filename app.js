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
    JavaScript: "/img/Javascript.webp",
    "Node.js": "/img/node.png",
    Kotlin: "/img/kotlin.png",
    Python: "/img/coronel.webp",
    HTML: "/img/html.png",
    CSS: "/img/css.png",
    PHP: "/img/php.png",
    MySQL: "/img/mysql.png",
    Java: "/img/java.png",
    Bootstrap:"/img/Bootstrap.png",
    Firebase:"/img/Firebase.png",
    Unity:"/img/unity.png",
    Godot:"/img/godot.png",
    Svelte:"/img/Svelte.png",
    React:"/img/React.png",
    Spring:"/img/Spring.png",

};

/* Ruta para obtener los datos de todos los miembros y proyectos grupales*/
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
            // Divide la cadena de tecnologías en un array y asignar imágenes
            if (plain.tecnologias) {
                plain.tecnologias = plain.tecnologias
                    .split(",")
                    .map((tech) => ({
                        name: tech.trim(),
                        image: techImages[tech.trim()] ,
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


/* Ruta para obtener los datos de un miembro*/
app.get("/memberPortfolio/:id", async (req, res) => {
    try {
        const memberId = req.params.id;

        const member = await Member.findByPk(memberId);

        if (member) {
            console.log(
                `Miembro encontrado: ${member.nombre} ${member.apellido}`
            );

            // Obtener todos los proyectos de tipo "individual" que incluyen al miembro
            const projects = await Project.findAll({
                where: {
                    tipo: "individual",
                },
                include: {
                    model: Member,
                    where: {
                        id: memberId,
                    },
                    through: { attributes: [] },
                },
            });

            // Procesar los proyectos
            const projectsData = projects.map((project) => {
                const plain = project.get({ plain: true });

                if (plain.tecnologias) {
                    plain.tecnologias = plain.tecnologias
                        .split(",")
                        .map((tech) => ({
                            name: tech.trim(),
                            image:
                                techImages[tech.trim()]  
                        }));
                }
                return plain;
            });

            // Procesar tecnologías del miembro
            const memberData = member.get({ plain: true });
            if (memberData.tecnologias) {
                memberData.tecnologias = memberData.tecnologias
                    .split(",")
                    .map((tech) => ({
                        name: tech.trim(),
                        image:
                            techImages[tech.trim()] || "/img/coronel.webp",
                    }));
            }

            // Renderizamos la vista 'memberPortfolio' pasando los proyectos y los datos del miembro
            res.render("memberPortfolio", {
                member: memberData,
                projects: projectsData,
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
