// src/components/EditTodoModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Styling dasar untuk modal agar berada di tengah
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
  },
};

// Memberitahu react-modal elemen root aplikasi Anda (untuk aksesibilitas)
Modal.setAppElement('#root');

const EditTodoModal = ({ todo, isOpen, onClose, onUpdateTodo }) => {
  // State lokal untuk menampung perubahan teks
  const [task, setTask] = useState('');

  // Sinkronkan state lokal dengan prop `todo` ketika modal dibuka
  useEffect(() => {
    if (todo) {
      setTask(todo.task);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onUpdateTodo(todo.id, task);
    }
  };

  if (!todo) {
    return null; // Jangan render apapun jika tidak ada todo yang dipilih
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // Fungsi untuk menutup modal saat klik di luar atau menekan Esc
      style={customStyles}
      contentLabel="Edit Todo Modal"
    >
      <h2>Edit Tugas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={onClose} style={{ padding: '10px' }}>
            Batal
          </button>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#61dafb', border: 'none' }}>
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;