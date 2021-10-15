import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./context/UserContext";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <ChakraProvider>
        <UserContext>
          <Home />
        </UserContext>
      </ChakraProvider>
    </Router>
  );
}

export default App;
