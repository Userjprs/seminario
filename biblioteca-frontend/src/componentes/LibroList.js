import React, { useState, useEffect } from 'react';
import { getLibros, createLibro, updateLibro, deleteLibro } from '../services/api';

const LibroList = () => {
  const [libros, setLibros] = useState([]);
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: '',
    autor: '',
    fecha_publicacion: '',
    editorial: '',
  });
  const [libroEditando, setLibroEditando] = useState(null);

  useEffect(() => {
    fetchLibros();
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await getLibros();
      setLibros(response.data);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  const handleAgregarLibro = async () => {
    try {
      if (libroEditando) {
        await updateLibro(libroEditando.id, nuevoLibro);
      } else {
        const response = await createLibro(nuevoLibro);
        setLibros([...libros, response.data]);
      }
      setNuevoLibro({ titulo: '', autor: '', genero: '', anio_publicacion: '' });
      setLibroEditando(null);
      fetchLibros();
    } catch (error) {
      console.error('Error al guardar libro:', error.response?.data || error.message);
    }
  };

  const handleEditarLibro = (libro) => {
    setLibroEditando(libro);
    setNuevoLibro({ ...libro });
  };

  const handleEliminarLibro = async (id) => {
    try {
      await deleteLibro(id);
      setLibros(libros.filter((libro) => libro.id !== id));
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Libros</h1>
      <div className="row">
        {libros.map((libro) => (
          <div key={libro.id} className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{libro.titulo}</h5>
                <p className="card-text">Autor: {libro.autor}</p>
                <p className="card-text">Género: {libro.genero}</p>
                <p className="card-text">Fecha Publicación: {libro.fecha_publicacion}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEditarLibro(libro)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleEliminarLibro(libro.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">{libroEditando ? 'Editar Libro' : 'Agregar Libro'}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={nuevoLibro.titulo}
            onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            value={nuevoLibro.autor}
            onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Género</label>
          <input
            type="text"
            className="form-control"
            value={nuevoLibro.genero}
            onChange={(e) => setNuevoLibro({ ...nuevoLibro, genero: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Año de Publicación</label>
          <input
            type="number"
            className="form-control"
            value={nuevoLibro.anio_publicacion}
            onChange={(e) => setNuevoLibro({ ...nuevoLibro, anio_publicacion: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAgregarLibro}>
          {libroEditando ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
};

export default LibroList;