import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim permintaan POST ke endpoint login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // Simpan token yang diterima ke Local Storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); //<-- TAMBAHKAN INI
      localStorage.setItem("name", response.data.user.name);

      alert("Login berhasil!");
      navigate("/"); // Arahkan ke halaman utama/dashboard setelah login
    } catch (error) {
      console.error("Login gagal:", error.response.data);
      alert("Login gagal. Periksa kembali email dan password Anda.");
    }
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5", // Warna latar belakang terang
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
    backgroundColor: "#007bff", // Warna biru untuk tombol
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3", // Warna biru lebih gelap saat hover
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
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <a href="/register" style={linkStyle}>Belum punya akun? Register di sini.</a>
      </div>
    </div>
  );
}

export default LoginPage;
