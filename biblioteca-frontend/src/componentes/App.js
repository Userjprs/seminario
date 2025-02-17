import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import PrestamoList from './components/PrestamoList';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">BibliotecApp 📚</h1>
        
        {/* Barra de navegación */}
        <nav className="nav justify-content-center mb-4">
          <Link className="nav-link" to="/">Lista de Libros</Link>
          <Link className="nav-link" to="/nuevo-libro">Agregar Libro</Link>
          <Link className="nav-link" to="/prestamos">Préstamos</Link>
        </nav>

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<LibroList />} />
          <Route path="/nuevo-libro" element={<LibroForm />} />
          <Route path="/prestamos" element={<PrestamoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;