import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { aesGcmDecrypt } from "../helper/crypto";
import { parseFragment } from "../helper/parseFragment";

import {

  useDisclosure,
} from "@chakra-ui/react";
import { getAndStoreCiph, getAndStoreUser } from "../helper/storage";

export const UserContext = React.createContext();

const UserContextWrapper = ({ children }) => {
  
  const [user, setUser] = useState();
  const [taxNumber, setTaxNumber] = useState();
  const [cipher, setCipher] = useState("");
  const [error, setError] = useState(false);
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });
  const location = useLocation();

  useEffect(() => {
    const urlCipher = decodeURI(location.hash.slice(1));
    getAndStoreCiph(urlCipher, setCipher);
    console.log("Found cipher: ", cipher);
  }, [location.hash, cipher]);

  useEffect(() => {
    // const cipher =
    // "2VWiKLopg1w+u7o9iE4lZ0Fjs67KzSbfpwltSWA6OYzisOUAmxlmz3BsgIgJfXk0ljUQq76yOYGX0pV1eNi0Fd75B0tE91lRMMhfONiRjVNJCbDprYC/K6u+YlnrJnKgixlresiTdsk=";
    aesGcmDecrypt(cipher, taxNumber)
      .then((plain) => {
        getAndStoreUser(parseFragment(plain), setUser);
        console.log(JSON.parse(localStorage.getItem("user")));
        setError(false);
        onClose();
      })
      .catch(() => setError(true));
  }, [location.hash, taxNumber, cipher, onClose]);

  return (
    <UserContext.Provider
      value={{
        user,
        decryptModalIsOpen: isOpen,
        decryptModalOnClose: onClose,
        decryptionError: error,
        setTaxNumber,
      }}
    >
      {location.hash && <Redirect to="/" />}
      {children}
      {console.log("user is", user)}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
