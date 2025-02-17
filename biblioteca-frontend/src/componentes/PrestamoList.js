import React, { useState, useEffect } from 'react';
import { getPrestamos, updatePrestamo } from '../services/api';

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const fetchPrestamos = async () => {
    try {
      const response = await getPrestamos();
      setPrestamos(response.data);
    } catch (error) {
      console.error('Error al obtener los préstamos:', error);
    }
  };

  const handleMarcarDevuelto = async (id) => {
    try {
      await updatePrestamo(id, { devuelto: true });
      setPrestamos(prestamos.map(p => p.id === id ? { ...p, devuelto: true } : p));
    } catch (error) {
      console.error('Error al marcar como devuelto:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Préstamos</h1>
      <div className="row">
        {prestamos.map((prestamo) => (
          <div key={prestamo.id} className="col-md-6">
            <div className={`card mb-3 ${prestamo.devuelto ? 'border-success' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{prestamo.libro.titulo}</h5>
                <p className="card-text">Usuario: {prestamo.usuario.nombre}</p>
                <p className="card-text">Fecha de préstamo: {prestamo.fecha_prestamo}</p>
                <p className="card-text">
                  Estado: {prestamo.devuelto ? <span className="text-success">Devuelto</span> : <span className="text-danger">Pendiente</span>}
                </p>
                {!prestamo.devuelto && (
                  <button className="btn btn-success" onClick={() => handleMarcarDevuelto(prestamo.id)}>
                    Marcar como Devuelto
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrestamoList;