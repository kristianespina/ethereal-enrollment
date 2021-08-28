export const Gender = ["male", "female", "n/a"];
export type Student = {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  sex: string;
  email: string;
  courses: Number[];
  // for login purposes
  studentCode: string;
};
