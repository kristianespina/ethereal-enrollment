import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "./style/theme.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Enrollment } from "./pages/Enrollment";

function App() {
  const theme = extendTheme({
    fonts: {
      heading: "Avenir",
      body: "Avenir",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Enrollment} />
          <Route path="/editProfile" component={Enrollment} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
