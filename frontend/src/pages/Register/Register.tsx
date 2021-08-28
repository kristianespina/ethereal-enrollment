import React from "react";
import { Flex } from "@chakra-ui/react";

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
        <RegistrationForm />
      </Flex>
    </Flex>
  );
};

export default Login;
