// controllers/taskController.js
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user.id, // from middleware
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
