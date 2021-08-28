import React, { useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { Flex, Box, Container, useToast } from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { courseRead } from "../../api/course";
import { updateCourse } from "../../features/course/courseSlice";

import Header from "../../components/Header";
import CourseGrid from "../../components/CourseGrid";
import EditProfile from "../../components/EditProfile";

// misc
import Lottie from "react-lottie-player";
import FoxAnimation from "../../assets/70710-fox-animation.json";
const Enrollment = () => {
  const { session, course } = useAppSelector((state) => state);

  const history = useHistory();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const getCourses = async () => {
    try {
      const response = await courseRead(session.token);
      if (response.status === 200) dispatch(updateCourse(response.data));
    } catch (e: any) {
      const message = e.response.data;
      toast({
        title: "Failed",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    if (!session.token) {
      toast({
        title: "Token required",
        description: "Please login to continue",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      history.push("/login");
    } else getCourses();
    // eslint-disable-next-line
  }, []);
  return (
    <Flex direction="column" bgColor="gray.100" pb={12} minH="100vh">
      {/* Header */}
      <Box bgColor="blue.700" py={24}>
        <Container maxW="1024px">
          <Header />
        </Container>
      </Box>
      {/* Courses */}
      <Box>
        <Container
          maxW="1024px"
          bgColor="white"
          mt={-24}
          p={8}
          borderRadius={12}
        >
          <Switch>
            <Route path="/editProfile">
              <Flex direction={["column-reverse", "column-reverse", "row"]}>
                <Box flexGrow={1}>
                  <EditProfile />
                </Box>
                <Container maxW={["300", "300", "md"]}>
                  <Lottie loop animationData={FoxAnimation} play />
                </Container>
              </Flex>
            </Route>
            <Route path="/">
              <CourseGrid course={course} />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Flex>
  );
};

export default Enrollment;
