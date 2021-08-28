import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Student as StudentType } from "../types/student";
import { Student, StudentAttributes } from "../models/student";
import { Course } from "../models/course";

const { TOKEN_KEY, TOKEN_EXPIRY, ENCRYPTION_SALT } = process.env;

const createToken = (user: StudentAttributes) => {
  const token = jwt.sign(
    {
      studentCode: user.studentCode,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
    },
    TOKEN_KEY as string,
    {
      expiresIn: TOKEN_EXPIRY,
    }
  );
  return token;
};

// login
const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!(email || password))
      return res.status(500).send("Please fill up required inputs");

    // Check if student exists
    const user = await Student.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = createToken(user);

      // send back response
      const {
        id,
        firstName,
        lastName,
        middleName,
        birthDate,
        sex,
        email,
        courses,
        studentCode,
      } = user;
      return res.status(200).send({
        user: {
          id,
          firstName,
          lastName,
          middleName,
          birthDate,
          sex,
          email,
          courses,
          studentCode,
        },
        token,
      });
    }
    return res.status(500).send("Invalid credentials");
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Model: Student
 * Supported Methods: PUT, PATCH, GET, DELETE
 */
// create
const studentCreate = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      birthDate,
      sex,
      email,
      //courses, // * No default course
      //studentCode, // * to be generated
      password,
    } = req.body as StudentAttributes;

    // Validation
    const requiredInputs =
      firstName && lastName && birthDate && sex && email && password;
    if (!requiredInputs)
      return res.status(500).send("Please fill up required inputs");

    // Create
    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(ENCRYPTION_SALT as string)
    );

    const existingUser = await Student.findOne({ where: { email } });
    if (existingUser)
      return res
        .status(500)
        .send("Email is already used. Please choose another one.");

    const courses = []; // no default enrolled course
    const studentCode = email;
    const user = await Student.create({
      firstName,
      lastName,
      middleName,
      birthDate,
      sex,
      email,
      password: encryptedPassword,
      courses: [],
      studentCode: studentCode,
    });

    if (user) {
      const token = createToken(user);
      // send back response
      const {
        id,
        firstName,
        lastName,
        middleName,
        birthDate,
        sex,
        courses,
        studentCode,
      } = user;
      return res.status(200).send({
        user: {
          id,
          firstName,
          lastName,
          middleName,
          birthDate,
          sex,
          courses,
          studentCode,
        },
        token,
      });
    }
    return res.status(500).send("Cannot register");
  } catch (e) {
    return res.status(500).send(e);
  }
};
// read
const studentRead = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]; // Authorization: Bearer JWT_ACCESS_TOKEN
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(500).send("Invalid token");

    const data = (await jwt.verify(
      token,
      TOKEN_KEY as string
    )) as Partial<StudentType>;

    // Check if student exists
    const user = await Student.findOne({
      where: { studentCode: data.studentCode },
    });
    if (user) {
      return res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        birthDate: user.birthDate,
        sex: user.sex,
        courses: user.courses,
        studentCode: user.studentCode,
      });
    }
    return res.status(500).send("Cannot find user");
  } catch (e) {
    return res.status(500).send(e);
  }
};
// update
const studentUpdate = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]; // Authorization: Bearer JWT_ACCESS_TOKEN
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(500).send("Invalid token");

    const data = (await jwt.verify(
      token,
      TOKEN_KEY as string
    )) as Partial<StudentType>;

    // sanitize input
    let body = { ...req.body };
    delete body.studentCode;
    delete body.id;

    const [updated] = await Student.update(req.body, {
      where: { studentCode: data.studentCode },
    });

    if (updated) {
      const user = await Student.findOne({
        where: {
          studentCode: data.studentCode,
        },
      });

      if (user) {
        return res.status(200).send({
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          birthDate: user.birthDate,
          sex: user.sex,
          courses: user.courses,
          studentCode: user.studentCode,
        });
      }
    }
    return res.status(500).send("Cannot update information");
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};
// update
const studentDelete = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]; // Authorization: Bearer JWT_ACCESS_TOKEN
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(500).send("Invalid token");

    const data = (await jwt.verify(
      token,
      TOKEN_KEY as string
    )) as Partial<StudentType>;

    const user = await Student.findOne({
      where: {
        studentCode: data.studentCode,
      },
    });

    if (user) {
      user.destroy();
      return res.status(200).json();
    }
    return res.status(500).send("Cannot delete student");
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

/**
 * Model: Course
 * Supported Methods: GET
 */
// read
const courseRead = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"]; // Authorization: Bearer JWT_ACCESS_TOKEN
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(500).send("Invalid token");

    const data = (await jwt.verify(
      token,
      TOKEN_KEY as string
    )) as Partial<StudentType>;

    // Check if course exists
    const courses = await Course.findAll();
    if (courses) {
      return res.status(200).send(courses);
    }
    return res.status(500).send("Cannot find courses");
  } catch (e) {
    return res.status(500).send(e);
  }
};
export {
  postLogin,
  studentCreate,
  studentRead,
  studentUpdate,
  studentDelete,
  courseRead,
};
