// src/pages/TodoPage.js

import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import TodoForm from "../../components/TodoForm.js";
import EditTodoModal from "../../components/EditTodoModal.js";
import SearchInput from "../../components/SearchInput.js"; // Pastikan ini diimpor
import axios from 'axios';


const TodoPage = () => {
  // State dari semua fitur digabungkan
  const token = localStorage.getItem('token');
  const headers = {
      'Authorization': `Bearer ${token}`
    };
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null); // State untuk modal
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian

  // Fungsi fetchTodos dari kode Anda yang sudah mendukung pencarian
  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect dari kode Anda untuk menangani debouncing pencarian
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500); // Menunggu 500ms setelah user berhenti mengetik
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    fetch("/api/todos", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())

      .then((data) => {
        setTodos([
          ...todos,

          { id: data.id, task: data.task, completed: false },
        ]);
      })

      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })

      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })

      .catch((err) => console.error("Error updating todo:", err));
  };

  // Handler untuk update yang sudah disesuaikan untuk modal
  const handleUpdateTodo = (id, newTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    })
      .then(() => {
        // Refresh data setelah update agar konsisten dengan hasil pencarian
        fetchTodos(searchTerm);
        setEditingTodo(null); // Tutup modal
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  // Definisi kolom untuk DataTable (tidak berubah)
  const columns = [
    {
      name: "Tugas",
      selector: (row) => row.task,
      sortable: true,
      cell: (row) => (
        <div
          style={{ textDecoration: row.completed ? "line-through" : "none" }}
        >
          {row.task}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.completed,
      sortable: true,
      cell: (row) =>
        row.completed ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Selesai</span>
        ) : (
          <span>Belum Selesai</span>
        ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => setEditingTodo(row)}
            style={{ backgroundColor: "lightblue" }}
          >
            Edit
          </button>
          <button onClick={() => handleToggleCompleted(row.id, row.completed)}>
            {row.completed ? "Batal" : "Selesai"}
          </button>
          <button
            onClick={() => handleDeleteTodo(row.id)}
            style={{ backgroundColor: "tomato", color: "white" }}
          >
            Hapus
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Tampilan loading dan error
  const renderContent = () => {
    if (error)
      return (
        <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
      );
    return (
      <DataTable
        columns={columns}
        data={todos}
        progressPending={loading} // Tampilkan indikator loading bawaan tabel
        pagination
        highlightOnHover
        striped
        noDataComponent="Tidak ada tugas yang ditemukan."
      />
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} />
      </header>

      {/* Tempatkan SearchInput di sini */}
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>Daftar Tugas Anda</h2>

      {/* Render tabel atau pesan error */}
      {renderContent()}

      {/* Render Modal (tidak berubah) */}
      <EditTodoModal
        isOpen={!!editingTodo}
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
};

export default TodoPage;
