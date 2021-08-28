import React from "react";
import { Flex, Text, Button, Spacer, useToast } from "@chakra-ui/react";
import { Course } from "../types/course";

import { updateStudent } from "../features/student/studentSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

import { studentUpdate } from "../api/student";
type Props = Partial<Course>;
const CourseCard = ({ id, code, name, units }: Props) => {
  const { student, session } = useAppSelector((state) => state);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleEnroll = async () => {
    if (id) {
      try {
        const _courses = [...student.courses];
        if (!_courses.includes(id)) {
          _courses.push(id);
          const response = await studentUpdate(
            { courses: _courses },
            session.token
          );

          if (response.status === 200) {
            console.log(response);
            dispatch(updateStudent(response.data));
            toast({
              title: "Success",
              description: "Successfully enrolled",
              status: "success",
              duration: 1500,
              isClosable: true,
              position: "top",
            });
          } else {
            toast({
              title: "Cannot enroll",
              description: "Please try again",
              status: "error",
              duration: 1500,
              isClosable: true,
              position: "top",
            });
          }
        }
      } catch (e: any) {
        const message = e.response.data;
        toast({
          title: "Cannot enroll",
          description: message,
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleDrop = async () => {
    if (id) {
      try {
        let _courses = [...student.courses];
        if (!_courses.includes(id)) return;
        _courses = _courses.filter((c) => c !== id);
        const response = await studentUpdate(
          { courses: _courses },
          session.token
        );

        if (response.status === 200) {
          console.log(response);
          dispatch(updateStudent(response.data));
          toast({
            title: "Success",
            description: "Successfully dropped the course",
            status: "success",
            duration: 1500,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Cannot drop course",
            description: "Please try again",
            status: "error",
            duration: 1500,
            isClosable: true,
            position: "top",
          });
        }
      } catch (e: any) {
        const message = e.response.data;
        toast({
          title: "Cannot drop course",
          description: message,
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  return (
    <Flex
      color="gray.600"
      bgColor="gray.100"
      p={4}
      direction="column"
      borderRadius={24}
    >
      <Text>{code}</Text>
      <Text fontWeight="bold" mb={12}>
        {name}
      </Text>
      <Spacer />
      <Flex direction="row" alignItems="flex-end">
        <Text flexGrow={1}>{units} units</Text>
        {id && student.courses.includes(id) ? (
          <Button size="xs" colorScheme="red" onClick={handleDrop}>
            Drop
          </Button>
        ) : (
          <Button size="xs" colorScheme="green" onClick={handleEnroll}>
            Enroll
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default CourseCard;
