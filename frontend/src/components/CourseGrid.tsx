import React from "react";
import { Grid, Box, Text } from "@chakra-ui/react";
import { Course } from "../types/course";
import CourseCard from "./CourseCard";

// misc
import Lottie from "react-lottie-player";
import PersonComputer from "../assets/24747-person-on-a-computer.json";

type Props = {
  course: Course[];
};
const CourseGrid = ({ course }: Props) => {
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(3, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={6}
    >
      <Box gridRowStart={1} gridRowEnd={3}>
        <Text fontWeight="bold" fontSize="2xl" color="blue.700">
          Offered Subjects
        </Text>
        <Text fontWeight="bold" fontSize="sm" color="blue.700">
          enrollment is still on-going
        </Text>
        <Lottie loop animationData={PersonComputer} play />
      </Box>
      {course.map((_course) => (
        <CourseCard
          key={_course.code}
          id={_course.id}
          code={_course.code}
          name={_course.name}
          units={_course.units}
        />
      ))}
    </Grid>
  );
};

export default CourseGrid;
