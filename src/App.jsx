import './App.css';
import React, { Component } from "react";
import Accueil from './pages/Accueil';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/Accueil" />} />
        <Route path="/Accueil" element={<Accueil />} />
      </Routes>
    );
  }
}

export default App;
