/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const ContextContainer = ({ children }) => {
  const [userListings, setUserListings] = useState([])
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false)

  const checkAlreadyLoggenIn = async () => {
    if (!localStorage.getItem("user")) {
      setIsAlreadyLoggedIn(false)
      return
    }
    const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check-login`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
    if (data.status == 200) {
      setIsAlreadyLoggedIn(true)
    } else {
      setIsAlreadyLoggedIn(false)
    }

  }
  useEffect(() => {
    checkAlreadyLoggenIn()
  }, [])

  const ContextValue = { isAlreadyLoggedIn, userListings, setUserListings, setIsAlreadyLoggedIn };

  return (
    <StoreContext.Provider value={ContextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextContainer;
