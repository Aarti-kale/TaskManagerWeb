
import React, { useEffect, useState } from "react";
import API from "../utils/axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
      setErr("");
    } catch (error) {
      setErr(error.response?.data?.message || "❌ Failed to load tasks");
    }
  };

  // Toggle status
  const toggleStatus = async (task) => {
    try {
      const updatedStatus = task.status === "completed" ? "pending" : "completed";
      await API.put(`/tasks/${task._id}`, { status: updatedStatus });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, status: updatedStatus } : t
        )
      );
    } catch {
      setErr("❌ Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setErr("❌ Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "600px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <h3 className="text-center mb-3">📋 Task List</h3>

        {err && <div className="alert alert-danger">{err}</div>}
        {tasks.length === 0 && (
          <p className="text-muted text-center">No tasks found. Add one first.</p>
        )}

        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span
                  style={{
                    textDecoration:
                      task.status === "completed" ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <span
                  className={`badge ms-3 ${
                    task.status === "completed" ? "bg-success" : "bg-warning text-dark"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => toggleStatus(task)}
                >
                  {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
