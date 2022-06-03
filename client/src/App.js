import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateAvatar from './pages/SetAvatar.jsx/index.js.js';

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createAvatar" element={<CreateAvatar />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
}
