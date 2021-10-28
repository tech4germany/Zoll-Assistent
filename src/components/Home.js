import React, { useContext } from "react";
import {
  Container,
  Text,
  Heading,
  Center,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "../context/UserContext";
import Zoll from "../img/zoll.png";
import DecryptModal from "./DecryptModal";

const Home = () => {
  const { user } = useContext(UserContext);

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
      {user ? (
        <>
          <Heading mb="1rem">
            Hallo {`${user.firstName} ${user.lastName}`},
          </Heading>
          <Text fontSize="lg">
            Steuernummer: <b>{user.taxNumber}</b>
          </Text>
          <Text fontSize="lg">{user.flavour}</Text>
        </>
      ) : (
        <>
          <DecryptModal />
          <Center>
            <VStack spacing="10">
              <Heading>Loading...</Heading>
              <Spinner />
              <Text>Make sure you have scanned a valid QR Code.</Text>
            </VStack>
          </Center>
        </>
      )}
    </Container>
  );
};

export default Home;
