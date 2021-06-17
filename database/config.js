const moongose = require("mongoose");

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Conectado a la base de datos...");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la conexión con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
