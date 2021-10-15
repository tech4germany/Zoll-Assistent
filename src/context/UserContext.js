import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { aesGcmDecrypt } from "../helper/crypto";
import { parseFragment } from "../helper/parseFragment";
import { useForm } from "react-hook-form";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export const UserContext = React.createContext();

const UserContextWrapper = ({ children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState();
  const [taxNumber, setTaxNumber] = useState();
  const [cipher, setCipher] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [plain, setPlain] = useState();
  const location = useLocation();

  useEffect(() => {
    const urlCipher = location.hash.slice(1);
    getAndStoreCiph(urlCipher, setCipher);
    console.log("got cipher", cipher);
  }, []);

  useEffect(() => {
    // const cipher =
    // "2VWiKLopg1w+u7o9iE4lZ0Fjs67KzSbfpwltSWA6OYzisOUAmxlmz3BsgIgJfXk0ljUQq76yOYGX0pV1eNi0Fd75B0tE91lRMMhfONiRjVNJCbDprYC/K6u+YlnrJnKgixlresiTdsk=";
    aesGcmDecrypt(cipher, taxNumber)
      .then((plain) => {
        getAndStoreUser(parseFragment(plain), setUser);
        console.log(JSON.parse(localStorage.getItem("user")));
        onClose();
      })
      .catch((e) => console.log(e));
  }, [location.hash, plain, taxNumber]);

  const onSubmit = (value) => {
    setTaxNumber(value.taxNumber);
  };

  return (
    <UserContext.Provider value={user}>
      {location.hash && <Redirect to="/" />}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Bitte geben Sie Ihre Steuernummer an, um Ihre persönlichen Daten zu
            entschlüsseln. [Ihre Steuernummer lautet für diesen Fall K12345678900]
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="taxNumber" isRequired mb="1rem">
                <FormLabel>Tax Number</FormLabel>
                <Input
                  placeholder="K123 4567 8900"
                  {...register("taxNumber", { required: true })}
                />
                <Button my="0.5rem" type="submit">
                  Entschlüsseln
                </Button>
                <FormErrorMessage>
                  {errors && "Geben Sie bitte eine Steuernummer an"}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

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

const getAndStoreCiph = (ciph, setCiph) => {
  if (!localStorage.getItem("ciph")) {
    setCiph(ciph);
    localStorage.setItem("ciph", JSON.stringify(ciph));
  } else if (!!localStorage.getItem("ciph") && !Object.keys(ciph).length) {
    setCiph(JSON.parse(localStorage.getItem("ciph")));
  } else {
    setCiph(ciph);
    localStorage.setItem("ciph", JSON.stringify(ciph));
  }
};

export default UserContextWrapper;
