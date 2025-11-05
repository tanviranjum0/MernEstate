/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const ContextContainer = ({ children }) => {

  const [user, setUser] = useState({
    isAlreadyLoggedIn: false
  })

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser({ ...JSON.parse(localStorage.getItem("user")), isAlreadyLoggedIn: true })
    }
  }, [])

  const ContextValue = { user };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextContainer;
