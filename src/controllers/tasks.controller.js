const pool = require("../postgresdb");

//en todos va el try catch
const getAllTasks = async (req, res, next) => {
  try {
    /* throw new Error("algo anduvo mal");  */ // esto es para tirar un error y que no se ejecute lo siguiente, si no, que pase directamente al catch
    const response = await pool.query("SELECT * FROM task");
    console.log(response);
    res.json(response.rows);
  } catch (error) {
    //siempre es por el error
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    //desestructuramos req.params para sacar el id
    const id = req.params.taskId;
    const response = await pool.query("SELECT * FROM task WHERE id =$1", [id]);

    if (response.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(response.rows[0]);
  } catch (error) {
    //siempre es por el error
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const {title, description} = req.body;
  console.log(title);
  try {
    const response = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTasks = async (req, res, next) => {
  try {
    const id = req.params.taskId;
    const response = await pool.query("DELETE FROM task WHERE id =$1", [id]);

    if (response.rowCount === 0)
      //si el contador de filas da cero, tira el error
      return res.status(404).json({
        message: "Task not found",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTasks = async (req, res, next) => {
  try {
    const id = req.params.taskId;
    const {title, description} = req.body;
    const response = await pool.query(
      "UPDATE task SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );

    if (response.rows.length === 0) {
      //si las filas de la respuesta tiene una longitud de cero, tira error
      return res.status(404).json({
        message: "No results found",
      });
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks: getAllTasks,
  getTask: getTask,
  createTask: createTask,
  deleteTasks: deleteTasks,
  updateTasks: updateTasks,
};
