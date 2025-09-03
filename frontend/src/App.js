import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Register route */}
        <Route path="/register" element={<Register />} />

        {/* Tasks page */}
        
        <Route path="/tasks/" element={<TaskForm />} />
        <Route path="/taskslist" element={<TaskList />} />
      </Routes>
    </Router>
  );
}
