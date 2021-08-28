import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Flex, Text, Button, useToast, Box, Container } from "@chakra-ui/react";
import InputField from "./Input/InputField";

// api
import { postLogin } from "../api/student";

// redux
import { updateStudent } from "../features/student/studentSlice";
import { updateToken } from "../features/session/sessionSlice";
import { useAppDispatch } from "../app/hooks";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postLogin(email, password);
      const { user, token } = response.data;
      dispatch(updateStudent(user));
      dispatch(updateToken(token));
      toast({
        title: "Success",
        description: "You have successfully logged in.",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      history.push("/");
    } catch (e: any) {
      const message = e.response.data;
      toast({
        title: "Login Failed",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Container w="xl">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gridGap={4}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.600">
            Hello again! Welcome back!
          </Text>
          <InputField value={email} label="Email" onChange={handleEmail} />
          <InputField
            value={password}
            label="Password"
            onChange={handlePassword}
            password
          />
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Box mt={4} textAlign="center" color="blue.800">
            <Link to="/register">or create an account instead</Link>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};

export default LoginForm;
