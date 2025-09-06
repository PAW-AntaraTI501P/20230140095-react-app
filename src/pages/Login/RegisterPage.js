// RegisterPage.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // Tambahkan state untuk field nama
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim permintaan POST ke endpoint register
      await axios.post(
        "http://localhost:5000/api/auth/register", 
        { name, email, password } // Kirim juga 'name' dalam payload
      );

      alert("Registrasi berhasil! Silakan login untuk melanjutkan.");
      navigate("/login"); // Arahkan ke halaman login setelah registrasi berhasil
    } catch (error) {
      console.error("Registrasi gagal:", error.response.data);
      alert("Registrasi gagal. Pastikan email belum terdaftar.");
    }
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  };

  const formBoxStyle = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
    textAlign: "left",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    width: "calc(100% - 20px)",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745", // Warna hijau untuk tombol register
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838", // Warna hijau lebih gelap saat hover
  };

  const linkStyle = {
    marginTop: "20px",
    display: "block",
    color: "#007bff",
    textDecoration: "none",
    fontSize: "14px",
  };

  return (
    <div style={formContainerStyle}>
      <div style={formBoxStyle}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Register
          </button>
        </form>
        <a href="/login" style={linkStyle}>Sudah punya akun? Login di sini.</a>
      </div>
    </div>
  );
}

export default RegisterPage;