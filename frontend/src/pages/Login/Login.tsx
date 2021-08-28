import React from "react";
import { Switch, Route } from "react-router";
import { Flex } from "@chakra-ui/react";

import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";

const Login = () => {
  return (
    <Flex direction="row" h="100vh">
      <Flex flexGrow={1} className="background">
        <Flex justifyContent="center" h="100vh"></Flex>
      </Flex>
      <Flex
        w={"500px"}
        p={8}
        h="100vh"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
      >
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationForm} />
        </Switch>
      </Flex>
    </Flex>
  );
};

export default Login;
