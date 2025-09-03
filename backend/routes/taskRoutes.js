const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require("../middleware/authMiddleware");

// /api/tasks/
router.get('/',protect, getTasks);

// /api/tasks/add
router.post('/add', protect, createTask);

// /api/tasks/:id
router.put('/:id',protect, updateTask);

// /api/tasks/:id
router.delete('/:id',protect, deleteTask);

module.exports = router;
