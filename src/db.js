require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs"); // para leer archivos
const path = require("path"); // para manipular rutas de archivos
const { Console } = require("console");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; // destructuring del objeto process que contiene las variables de entorno .env

// instanciamos una nueva conexión a la base de datos conn la url de conexión que le pasamos como parámetro a Sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/Dogs`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename); // obtenemos el nombre del archivo actual que es db.js

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners, es decir cualquier carpeta que cree en models se va a agregar al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos //! esta linea de codigo ejecuta las funciones que estan en la carpeta models dentro de los archivos js y les pasa como parametro a sequelize y asi se crea la tabla en la base de datos

/*modelDefiners.forEach((model) => model(sequelize));
// se cambia a mayuscula la primera letra de cada modelo 'videogame'=> Videogame
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);*/

// hasta este punto ya estan creadas las tablas en la base de datos
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Raza, Temp } = sequelize.models;
//console.log(sequelize.models)

// Aca vendrian las relaciones de si son de muchos a pocos y asi de cada modelo es decir las mediatablas
Raza.belongsToMany(Temp, { through: "TempRazas" });
Temp.belongsToMany(Raza, { through: "TempRazas" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
