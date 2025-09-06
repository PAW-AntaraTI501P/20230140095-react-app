// src/pages/HomePage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  // 1. State untuk menyimpan data user yang login
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 2. useEffect untuk memeriksa Local Storage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Jika ada data user di local storage, simpan ke state
      setUser(JSON.parse(storedUser));
    }
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat komponen pertama kali render

  // 3. Fungsi untuk menangani logout
  const handleLogout = () => {
    // Hapus data dari Local Storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");

    // Atur state user kembali ke null
    setUser(null);

    alert("Anda telah berhasil logout.");
    navigate("/"); // Arahkan kembali ke home (opsional, untuk refresh state)
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily: "sans-serif",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    margin: "10px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff4d4d", // Warna merah untuk logout
    color: "white",
  };
  
  const authContainerStyle = {
    display: 'flex',
    gap: '15px' // Memberi jarak antara tombol login dan register
  }
  
  const welcomeTextStyle = {
    fontSize: '1.5em',
    margin: '20px 0',
    color: '#61dafb'
  }

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      
      {/* 4. Tampilan bersyarat berdasarkan state 'user' */}
      {user ? (
        // TAMPILAN JIKA SUDAH LOGIN
        <>
          <p style={welcomeTextStyle}>Halo, {}! ✨</p>
          <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
          <div>
            <Link to="/todos" style={buttonStyle}>
              Lihat Daftar Todo
            </Link>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </div>
        </>
      ) : (
        // TAMPILAN JIKA BELUM LOGIN
        <>
          <p>Silakan login untuk melanjutkan.</p>
          <div style={authContainerStyle}>
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
            <Link to="/register" style={buttonStyle}>
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;