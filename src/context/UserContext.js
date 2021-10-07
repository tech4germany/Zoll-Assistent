import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { parseFragment } from "../helper/parseFragment";

export const UserContext = React.createContext();

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const storeUser = parseFragment(location.hash);
    if (!localStorage.getItem("user")) {
      setUser(storeUser);
      localStorage.setItem("user", JSON.stringify(storeUser));
    } else if (
      !!localStorage.getItem("user") &&
      !Object.keys(storeUser).length
    ) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(storeUser);
      localStorage.setItem("user", JSON.stringify(storeUser));
    }

    console.log(JSON.parse(localStorage.getItem("user")));
  }, [location.hash]);

  return (
    <UserContext.Provider value={user}>
      {location.hash && <Redirect to="/" />}
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
