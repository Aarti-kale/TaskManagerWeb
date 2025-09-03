import React, { useState } from "react";
import API from "../utils/axios";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (!title.trim()) {
      setErr("⚠️ Task title cannot be empty");
      return;
    }

    try {
      const res = await API.post("/tasks/add", { title });
      setSuccess("✅ Task created successfully!");
      setTitle("");
      console.log("New Task:", res.data);
    } catch (error) {
      setErr(error.response?.data?.message || "❌ Task creation failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "500px" }}>
        <h3 className="text-center mb-3">➕ Add New Task</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Task
          </button>

          {err && <div className="alert alert-danger mt-3">{err}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </form>
      </div>
    </div>
  );
}
