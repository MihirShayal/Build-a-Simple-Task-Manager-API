const express = require("express");

const router = express.Router();

const {
  task,
  getTask,
  allTask,
  updateTask,
  deleteTask,
  getTaskStatus,
} = require("../controllers/controller");

router.post("/tasks", task);
router.get("/tasks/:id", getTask);
router.get("/tasks", allTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/status/:status", getTaskStatus);

module.exports = router;
