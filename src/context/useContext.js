import React, { useState } from "react";

export const useContext = React.createContext({});

export const contextProvide = (props) => {
  return <useContext.Provider>{props.children}</useContext.Provider>;
};
