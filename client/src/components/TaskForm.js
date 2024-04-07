import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function TaskForm() {
  /* const [task, setTask] = useState({
    title: "",
    description: "",
  }); //El estado por defecto en las cajas es que no va a haber nada */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault(); //nos permite cancelar el refresh del boton

    setLoading(true);
    const body = {
      title,
      description,
    };

    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } else {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST", //el metodo http
        body: JSON.stringify(body), //le envio el titulo y la descripcion, pero como vienen como json, entonces, el JSON.stringify convierte el objeto en un string
        headers: {
          "Content-Type": "application/json",
        }, //le decimos que el contenido es de tipo JSON
      });
      const data = await res.json(); //convierto la respuesta en json para verlo
      console.log(data);
    }

    setLoading(false);
    navigate("/");
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  /* const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value}); //primero setea lo siguiente: copia todo lo que contiene task y despues actualiza el valor de la text field al nombre de la text field ejemplo : title:"nueva tarea"
  }; */
  const loadTask = async (taskId) => {
    const res = await fetch(`http://localhost:4000/tasks/${taskId}`);
    const data = await res.json();
    console.log(data);
    setTitle(data.title);
    setDescription(data.description);
    setEditing(true);
  };

  useEffect(() => {
    if (params.taskId) {
      loadTask(params.taskId);
    }
  }, [params.taskId]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column">
      <Grid item xs={3}>
        <Card
          sx={{mt: 5}}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}>
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Edit task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                value={title}
                onChange={handleChangeTitle}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />

              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={description}
                onChange={handleChangeDescription}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: "white"}}}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!title || !description}>
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
