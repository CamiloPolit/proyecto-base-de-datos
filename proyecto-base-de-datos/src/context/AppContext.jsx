import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('');

  return (
    <AppContext.Provider value={{
      isContainerVisible,
      setIsContainerVisible,
      filtroSeleccionado,
      setFiltroSeleccionado
    }}>
      {children}
    </AppContext.Provider>
  );
};