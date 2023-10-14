"use client";
import React, { createContext, useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

interface SideBarContextType {
  isCollapsed: boolean;
  toggleSidebarcollapse?: () => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

const SideBarProvider = ({ children }: Props) => {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  // Agrega un efecto para escuchar el tamaño de la pantalla y actualizar isCollapsed
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Función para manejar el cambio de la media query
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setCollapse(e.matches); // Colapsar si la pantalla es pequeña
    };

    // Agregar un listener de cambio de media query
    mediaQuery.addListener(handleMediaQueryChange);

    // Establecer el valor inicial basado en el tamaño de la pantalla
    setCollapse(mediaQuery.matches);

    return () => {
      // Limpia el listener cuando el componente se desmonta
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SideBarContext.Provider>
  );
};

export { SideBarContext, SideBarProvider };
