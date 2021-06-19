const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathUsuarios = "/api/users";
    this.pathAuth = "/api/auth";

    // Conexion a la base de datos
    this.dbConnect();

    // Middelwares
    this.middlewares();

    // Lectura y parseo del body
    this.app.use(express.json());

    // Rutas de mi aplicación
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.pathAuth, require("../routes/auth.routes"));
    this.app.use(this.pathUsuarios, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(
      this.port,
      console.log(`Servidor express corriendo en el puerto ${this.port}`)
    );
  }
}

module.exports = Server;
