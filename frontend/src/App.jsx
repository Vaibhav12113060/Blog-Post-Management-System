import { useState } from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login"; // Corrected import name
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/Register"; // Corrected import name
import BlogFormPage from "./pages/BlogForm"; // Renamed for clarity
import ViewBlogPage from "./pages/ViewBlog"; // Corrected import name
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* ViewBlog can be public or protected. Assuming it's public for general viewing. */}
      <Route path="/view/:id" element={<ViewBlogPage />} />

      {/* Protected Routes - All routes nested here will use the ProtectedRoute logic */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<BlogFormPage mode="create" />} />
        <Route path="/edit/:id" element={<BlogFormPage mode="edit" />} />
        {/* If ViewBlog also needs to be protected, move it here: */}
        {/* <Route path="/view/:id" element={<ViewBlogPage />} /> */}
      </Route>

      {/* Root path redirects to dashboard (or login if not authenticated) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
