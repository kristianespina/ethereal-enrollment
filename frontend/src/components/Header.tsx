import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Box, Button } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEdit, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updateToken } from "../features/session/sessionSlice";

const Header = () => {
  const { student, course } = useAppSelector((state) => state);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleCourses = () => {
    history.push("/");
  };
  const handleEditProfile = () => {
    history.push("/editProfile");
  };
  const handleLogout = () => {
    history.push("/login");
    dispatch(updateToken(""));
  };
  return (
    <>
      <Flex direction={["column", "column", "row"]} gridGap={2}>
        <Box flexGrow={1}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Hi, {student.firstName} {student?.middleName} {student.lastName}
          </Text>
        </Box>
        <Flex direction="row" gridGap={2} mb={[4, 4, 0]}>
          <Button colorScheme="gray" onClick={handleCourses}>
            <Flex
              direction="row"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              gridGap={1}
            >
              <FontAwesomeIcon icon={faBook} />
              View Subjects
            </Flex>
          </Button>
          <Button colorScheme="gray" onClick={handleEditProfile}>
            <Flex
              direction="row"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              gridGap={1}
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit Profile
            </Flex>
          </Button>
          <Button colorScheme="gray" onClick={handleLogout}>
            <Flex
              direction="row"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              gridGap={1}
            >
              <FontAwesomeIcon icon={faPowerOff} />
              Logout
            </Flex>
          </Button>
        </Flex>
      </Flex>
      <Text fontSize="lg" fontWeight="bold" color="gray.100" mb={12}>
        You're currently enrolled in {student.courses.length}/{course.length}{" "}
        subjects
      </Text>
    </>
  );
};

export default Header;
