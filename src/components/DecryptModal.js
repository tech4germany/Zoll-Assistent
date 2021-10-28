import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserContext";

const DecryptionModal = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const {
    setTaxNumber,
    decryptModalIsOpen,
    decryptModalOnClose,
    decryptionError,
  } = useContext(UserContext);

  const onSubmit = (value) => {
    setTaxNumber(value.taxNumber);
    setSubmitted(true);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={decryptModalIsOpen}
      onClose={decryptModalOnClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Bitte geben Sie Ihre Steuernummer an, um Ihre persönlichen Daten zu
          entschlüsseln. [Ihre Steuernummer lautet für diesen Fall K12345678900.
          In Wirklichkeit findest du den auf deinem Mahnschreiben.]
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="taxNumber" isRequired mb="1rem">
              <FormLabel>Tax Number</FormLabel>
              <Input
                placeholder="K123 4567 8900"
                {...register("taxNumber", { required: true })}
              />
              <Text color="tomato">
                {submitted &&
                  decryptionError &&
                  "Die Steuernummer war nicht korrekt, versuchen Sie es erneut."}
              </Text>
              <Button my="0.5rem" type="submit">
                Entschlüsseln
              </Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DecryptionModal;
