require("dotenv").config();
import express from "express";
import cors from "cors";
import { Sequelize } from "./models";

import { Student, Credentials } from "./types/student";
import { Course as CourseType } from "./types/course";
import { Course } from "./models/course";

import {
  postLogin,
  studentCreate,
  studentRead,
  studentUpdate,
  studentDelete,
  courseRead,
} from "./controllers";
// setup
const app = express();
app.use(express.json());
app.use(cors());

// methods
app.get("/api/courses", (req, res) => {
  return Course.findAll()
    .then((courses: any) => res.send(courses))
    .catch((err: any) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});
// JWT
app.post("/api/login", postLogin);

/**
 * Model: Student
 */
// Method: CREATE
app.put("/api/student", studentCreate);
// Method: READ
app.get("/api/student", studentRead);
// Method: UPDATE
app.patch("/api/student", studentUpdate);
/// Method: DELETE
app.delete("/api/student", studentDelete);

/**
 * Model: Course
 */
app.get("/api/course", courseRead);
// listen
app.listen(3001, () => {
  console.log("The application is listening on port 3001!");
});
