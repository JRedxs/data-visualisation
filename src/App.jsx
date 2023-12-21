import './App.css';
import React, { Component } from "react";
import Accueil from './pages/Accueil';
import Graph from './pages/Graph';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DragDrop from './components/dragandrop';

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/Accueil" />} />
        <Route path="/Accueil" element={<DragDrop />} />
        <Route path="/Graph" element={<Graph />} />
      </Routes>
    );
  }
}

export default App;
