import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { aesGcmDecrypt } from "../helper/crypto";
import { parseFragment } from "../helper/parseFragment";

export const UserContext = React.createContext();

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState();
  const [cipher, setCipher] = useState(
    "2VWiKLopg1w+u7o9iE4lZ0Fjs67KzSbfpwltSWA6OYzisOUAmxlmz3BsgIgJfXk0ljUQq76yOYGX0pV1eNi0Fd75B0tE91lRMMhfONiRjVNJCbDprYC/K6u+YlnrJnKgixlresiTdsk="
  );
  const [plain, setPlain] = useState();
  const location = useLocation();

  useEffect(() => {}, []);

  useEffect(() => {
    // const cipher =
    // "2VWiKLopg1w+u7o9iE4lZ0Fjs67KzSbfpwltSWA6OYzisOUAmxlmz3BsgIgJfXk0ljUQq76yOYGX0pV1eNi0Fd75B0tE91lRMMhfONiRjVNJCbDprYC/K6u+YlnrJnKgixlresiTdsk=";
    // const cipher = parseFragment(location.hash);
    try {
      aesGcmDecrypt(cipher, "K12345678900").then((plain) => {
        getAndStoreUser(parseFragment(plain), setUser);
        console.log(JSON.parse(localStorage.getItem("user")));
      });
    } catch (error) {}
  }, [location.hash, plain]);

  return (
    <UserContext.Provider value={user}>
      {location.hash && <Redirect to="/" />}
      {children}
      {console.log(cipher)}
      {console.log("user is", user)}
    </UserContext.Provider>
  );
};

const getAndStoreUser = (user, setUser) => {
  if (!localStorage.getItem("user")) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  } else if (!!localStorage.getItem("user") && !Object.keys(user).length) {
    setUser(JSON.parse(localStorage.getItem("user")));
  } else {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export default UserContextWrapper;
