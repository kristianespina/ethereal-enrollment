import { Course } from "./course";

export type Gender = "male" | "female" | "n/a";
export type Student = {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: Date;
  sex: Gender;
  courses: Course[];
  // for login purposes
  studentCode: string;
};

export type Credentials = {
  studentCode: string;
  password: string;
};
