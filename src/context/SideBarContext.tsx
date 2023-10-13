"use client";
import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface SideBarContextType {
  isCollapsed: boolean;
  toggleSidebarcollapse?: () => void;
}

const initialValue: SideBarContextType = { isCollapsed: false };

const SideBarContext = createContext(initialValue);

const SideBarProvider = ({ children }: Props) => {
  const [isCollapsed, setCollapse] = useState(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SideBarContext.Provider>
  );
}

export { SideBarContext, SideBarProvider };