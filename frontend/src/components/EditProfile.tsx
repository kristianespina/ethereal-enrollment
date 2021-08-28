import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Spacer, Button, useToast } from "@chakra-ui/react";
import InputField from "./Input/InputField";
import InputDate from "./Input/InputDate";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updateStudent } from "../features/student/studentSlice";
import SelectInput from "./Input/SelectInput";
import { studentDelete, studentUpdate } from "../api/student";

import { Gender } from "../types/student";
const EditProfile = () => {
  const { student, session } = useAppSelector((state) => state);
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [birthDate, setbirthDate] = useState(new Date());
  const [sex, setsex] = useState("male");

  const history = useHistory();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirstName(e.target.value);
  };
  const onChangeMiddleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmiddleName(e.target.value);
  };
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlastName(e.target.value);
  };
  const onChangeBirthdate = (d: Date) => {
    setbirthDate(d);
  };
  const onChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsex(e.target.value);
  };

  const handleSave = async () => {
    try {
      const _birthDate = new Date(birthDate).toISOString();
      const response = await studentUpdate(
        {
          firstName,
          middleName,
          lastName,
          birthDate: _birthDate,
          sex,
        },
        session.token
      );
      if (response.status === 200) {
        dispatch(updateStudent(response.data));
        toast({
          title: "Successful",
          description: "Successfully updated profile",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      }
    } catch (e: any) {
      const message = e.response.data;
      toast({
        title: "Failed in editing profile",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleDelete = async () => {
    try {
      const response = await studentDelete(session.token);
      if (response.status === 200) {
        toast({
          title: "Successful",
          description: "Account successfully deleted!",
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
        title: "Failed in deleting account",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    setfirstName(student.firstName);
    student.middleName && setmiddleName(student.middleName);
    setlastName(student.lastName);
    setbirthDate(new Date(student.birthDate));
    setsex(student.sex);
  }, [student]);
  return (
    <Flex direction="column" gridGap={4}>
      <Flex direction="row">
        <Text fontWeight="bold" fontSize="2xl" color="blue.700">
          Edit Profile
        </Text>
        <Spacer />
        <Button colorScheme="red" onClick={handleDelete} mr={4}>
          Delete Account
        </Button>
        <Button colorScheme="green" onClick={handleSave}>
          Save Changes
        </Button>
      </Flex>
      <InputField
        value={firstName}
        label="First Name"
        onChange={onChangeFirstName}
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
      />
      <InputDate
        label="Birthdate"
        value={new Date(student.birthDate) || new Date()}
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
    </Flex>
  );
};

export default EditProfile;
