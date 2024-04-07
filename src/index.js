const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRoutes = require("./routes/tasks.routes");

const app = express();

app.use(cors()); //el cors nos permite conectar los dos servidores
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(taskRoutes);

//el next sirve para que cuando hay un error re retorne a este lugar
app.use((error, req, res, next) => {
  return res.json({
    message: error.message,
  });
});

app.listen(4000);
console.log("listening on 4000");
