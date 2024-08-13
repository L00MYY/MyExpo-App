import React, { createContext, useState, useContext } from 'react';

/*comparte el estado y funciones relacionadas a crear, actualizar y eliminar propuesta, usePropuesta es un hook 
de facil acceso al contexto y permite acceder y devolver resultados segun lo necesitado */

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
