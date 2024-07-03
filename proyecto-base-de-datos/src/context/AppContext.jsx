import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('');
  const [numFiltro, setNumFiltro] = useState('');

  return (
    <AppContext.Provider value={{
      isContainerVisible,
      setIsContainerVisible,
      filtroSeleccionado,
      setFiltroSeleccionado,
      numFiltro,
      setNumFiltro
    }}>
      {children}
    </AppContext.Provider>
  );
};