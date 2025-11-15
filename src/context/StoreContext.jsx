/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const ContextContainer = ({ children }) => {
  const [userListings, setUserListings] = useState([])
  const [isAlreadyLoggedIn, setIsAlreadyloggedIn] = useState(false)


  useEffect(() => {
    const checkAlreadyLoggenIn = async () => {
      const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check-login`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
      if (data.status == 200) {
        setIsAlreadyloggedIn(true)
      } else {
        setIsAlreadyloggedIn(false)
      }
    }
    checkAlreadyLoggenIn()
  }, [])

  const ContextValue = { isAlreadyLoggedIn, userListings, setUserListings, setIsAlreadyloggedIn };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextContainer;
