const express = require("express");

const router = express.Router();

let tasks = [];

let id = 1;

router.post("/tasks", (req, res) => {
  // console.log(req.body);

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      status: "error",
      message: "Title and description are required",
    });
  }

  const newTask = {
    id: id++,
    title,
    description,
    status: "pending",
  };

  tasks.push(newTask);
  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
});

router.get("/tasks/:id", (req, res) => {
  // console.log(typeof(req.params.id));
  const taskId = Number(req.params.id); // Convert to number

  let task;
  for (let i = 0; i < tasks.length; i++) {
    // console.log(tasks[i]);
    if (tasks[i].id === taskId) {
      task = tasks[i];
      break;
    }
  }

  if (!task) {
    return res.status(400).json({
      status: "error",
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});
//retrieve all tasks
router.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Update a Task
router.put("/tasks/:id", (req, res) => {
  // console.log(req.params);
  const taskId = Number(req.params.id);
  const { status } = req.body;

  // the status is valid or not
  if (status !== "pending" && status !== "completed") {
    return res.status(400).json({
      status: "error",
      message: "Status must be pending or completed",
    });
  }

  // task in the tasks array
  let task;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      task = tasks[i];
      break;
    }
  }

  if (!task) {
    return res.status(404).json({
      error: "Task Not found",
    });
  }

  task.status = status;

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
});

// DELETE router
router.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  let taskIndex = -1;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      taskIndex = i;
      break; // Exit loop if task found
    }
  }

  if (taskIndex === -1) {
    return res.status(400).json({
      error: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1); // Delete task from the array
  res.status(200).json({
    message: "Task deleted successfully",
  });
});

router.get("/tasks/status/:status", (req, res) => {
  const status = req.params.status;

  if (status !== "pending" && status !== "completed") {
    return res.status(400).json({
      status: "error",
      message: 'Status must be "pending" or "completed"',
    });
  }

  const filterTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === status) {
      filterTasks.push(tasks[i]);
    }
  }

  res.status(200).json(filterTasks);
});

module.exports = router;
