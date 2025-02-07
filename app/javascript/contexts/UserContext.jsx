import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  csrf: null
});

const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [csrf, setCsrf] = useState(null)

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf
      }
    }).then(setUser(null));
  };

  return <UserContext.Provider value={{ user, login, logout, setCsrf }}>
    {props.children}
  </UserContext.Provider>
}

const useUserContext = () => useContext(UserContext)

export { UserContextProvider, useUserContext }