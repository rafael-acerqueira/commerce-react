import React from "react";
import { UserContextProvider } from "../contexts/UserContext";

import Routes from "../routes";

export default () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}
