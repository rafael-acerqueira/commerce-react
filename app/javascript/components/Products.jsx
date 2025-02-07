import React from "react";
import { useUserContext } from "../contexts/UserContext"

export default () => {

  const { user, logout } = useUserContext();

  return (
    <div>
      <h1>Products</h1>
      {
        user && <button onClick={logout}>Logout</button>
      }
    </div>
  )
}