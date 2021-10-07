import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./context/UserContext";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <UserContext>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </UserContext>
    </Router>
  );
}

export default App;
