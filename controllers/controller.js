let tasks = [];
let id = 1;

const task = (req, res) => {
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
};

const getTask = (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((task) => task.id == taskId);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  res.status(200).json(task);
};

const allTask = (req, res) => {
  res.status(200).json(tasks);
};

const updateTask = (req, res) => {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  if (status !== "pending" && status !== "completed") {
    return res.status(400).json({
      status: "error",
      message: "Status must be pending or completed",
    });
  }

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  task.status = status;

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
};

const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({
    message: "Task deleted successfully",
  });
};

const getTaskStatus = (req, res) => {
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
};

module.exports = {
  task,
  getTask,
  allTask,
  updateTask,
  deleteTask,
  getTaskStatus
};
