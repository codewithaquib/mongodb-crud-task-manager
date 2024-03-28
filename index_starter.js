const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;

// Create Express application
const app = express();
app.use(bodyParser.json());

// Route to create a new task
app.post("/tasks", async (req, res) => {});

// Route to get all tasks
app.get("/tasks", async (req, res) => {});

// Route to get a specific task
app.get("/tasks/:id", async (req, res) => {});

// Route to update a task
app.patch("/tasks/:id", async (req, res) => {});

// Route to delete a task
app.delete("/tasks/:id", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
