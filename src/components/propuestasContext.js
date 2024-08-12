import React, { createContext, useState, useContext } from 'react';

const PropuestasContext = createContext();

export const usePropuestas = () => useContext(PropuestasContext);

export const PropuestasProvider = ({ children }) => {
  const [propuestas, setPropuestas] = useState([]);

  const agregarPropuesta = (nuevaPropuesta) => {
    setPropuestas([...propuestas, nuevaPropuesta]);
  };

  const actualizarPropuesta = (id, propuestaActualizada) => {
    setPropuestas(propuestas.map((propuesta, index) => 
      index === id ? propuestaActualizada : propuesta
    ));
  };

  const eliminarPropuesta = (id) => {
    setPropuestas(propuestas.filter((_, index) => index !== id));
  };

  return (
    <PropuestasContext.Provider value={{ propuestas, agregarPropuesta, actualizarPropuesta, eliminarPropuesta }}>
      {children}
    </PropuestasContext.Provider>
  );
};
