require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Start the Express server
const port = 3000 || process.env.PORT;
const db_url = process.env.MONGODB_URL;

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  desription: String,
  dueDate: Date,
  completed: Boolean,
});

// Task Model
const Task = new mongoose.model("Task", taskSchema);

// Create Express application
const app = express();
app.use(bodyParser.json());

// Route to create a new task
app.post("/tasks", async (req, res) => {
  const { title, desription, dueDate, completed } = req.body;
  const newTask = await Task.create({
    title,
    desription,
    dueDate,
    completed,
  });
  res.status(201).json(newTask);
});

// Route to get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Route to get a specific task
app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Not found" });
  }
  const taskData = {
    id: task._id,
    title: task.title,
  };
  res.json(taskData);
});

// Route to update a task
app.patch("/tasks/:id", async (req, res) => {
  const { title, desription, dueDate, completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      desription,
      dueDate,
      completed,
    },
    { new: true }
  );
  res.json(updatedTask);
});

// Route to delete a task
app.delete("/tasks/:id", async (req, res) => {
  await findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted!" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  mongoose.connect(db_url);
});
