import React, { useState, useContext } from "react";
import { Container, Text, Heading, Center, Image } from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import Zoll from "../img/zoll.png";

const Home = () => {
  const user = useContext(UserContext);

  return (
    <Container
      mt="5rem"
      boxShadow="base"
      pb="3rem"
      px="3rem"
      borderRadius="xl"
      bg="blue.50"
    >
      <Center boxSize="3xs" m="auto" mb="3rem">
        <Image src={Zoll} alt="Zoll Logo" />
      </Center>
      {user && (
        <>
          <Heading mb="1rem">Hallo {`${user.fName} ${user.lName}`}</Heading>

          <Text fontSize="lg">
            Steuernummer: <b>{user.stNum}</b>
          </Text>
          <Text fontSize="lg">
            Zu zahlender Betrag: <b>{user.toPay}</b> bis zum{" "}
            <b>{user.dueDate}</b>
          </Text>
        </>
      )}
    </Container>
  );
};

export default Home;
