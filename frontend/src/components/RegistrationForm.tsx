import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button, useToast, Container } from "@chakra-ui/react";

// form
import InputField from "./Input/InputField";
import InputDate from "./Input/InputDate";
import SelectInput from "./Input/SelectInput";
import { Gender } from "../types/student";

// api
import { studentCreate, StudentRequest } from "../api/student";

// redux
import { updateStudent } from "../features/student/studentSlice";
import { updateToken } from "../features/session/sessionSlice";
import { useAppDispatch } from "../app/hooks";

const RegistrationForm = () => {
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [birthDate, setbirthDate] = useState(new Date());
  const [sex, setsex] = useState("n/a");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const history = useHistory();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirstName(e.target.value);
  };
  const onChangeMiddleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmiddleName(e.target.value);
  };
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlastName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };
  const onChangeBirthdate = (d: Date) => {
    setbirthDate(d);
  };
  const onChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsex(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate User Input
      const requiredFields =
        firstName &&
        lastName &&
        // middleName && // optional
        birthDate &&
        sex &&
        email &&
        password &&
        confirmPassword;

      if (!requiredFields)
        return toast({
          title: "Account creation failed",
          description: "Please fill out all the required fields",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top",
        });

      if (password !== confirmPassword)
        return toast({
          title: "Account creation failed",
          description: "Passwords do not match!",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      // Request
      const _birthDate = new Date(birthDate).toISOString();
      const credentials = {
        firstName,
        lastName,
        middleName,
        birthDate: _birthDate,
        sex,
        email,
        password,
      } as StudentRequest;

      const response = await studentCreate(credentials);
      if (response.status === 200) {
        dispatch(updateStudent(response.data));
        toast({
          title: "Successful",
          description: "Account created!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        history.push("/login");
      }
    } catch (e: any) {
      const message = e.response.data;
      toast({
        title: "Account creation failed",
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
            Create an account
          </Text>
          <InputField
            value={firstName}
            label="First Name"
            onChange={onChangeFirstName}
            required
          />
          <InputField
            value={middleName}
            label="Middle Name"
            onChange={onChangeMiddleName}
          />
          <InputField
            value={lastName}
            label="Last Name"
            onChange={onChangeLastName}
            required
          />
          <InputField
            value={email}
            label="Email Address"
            onChange={onChangeEmail}
            required
          />
          <InputDate
            label="Birthdate"
            value={birthDate}
            placeholder=""
            onChange={onChangeBirthdate}
          />
          <SelectInput
            options={Gender}
            value={sex}
            label="Gender"
            placeholder=""
            onChange={onChangeSex}
          />
          <InputField
            value={password}
            label="Password"
            onChange={onChangePassword}
            password
            required
          />
          <InputField
            value={confirmPassword}
            label="Confirm Password"
            onChange={onChangeConfirmPassword}
            password
            required
          />
          <Button type="submit" colorScheme="blue">
            Register
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default RegistrationForm;
