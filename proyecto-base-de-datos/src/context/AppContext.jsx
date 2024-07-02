import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isContainerVisible, setIsContainerVisible] = useState(true);

  return (
    <AppContext.Provider value={{ isContainerVisible, setIsContainerVisible }}>
      {children}
    </AppContext.Provider>
  );
};