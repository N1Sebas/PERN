const {Router} = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTasks,
  updateTasks,
} = require("../controllers/tasks.controller");
const {registerUsers} = require("../controllers/signup.controller");
const {loginUsers} = require("../controllers/signin.controller");

const router = Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/:taskId", getTask);

router.post("/tasks", createTask);

router.delete("/tasks/:taskId", deleteTasks);

router.patch("/tasks/:taskId", updateTasks);

router.post("/auth/signup", registerUsers);

router.post("/auth/signin", loginUsers);
/* 
router.post("/auth/logout", registerUsers);  */

module.exports = router;
