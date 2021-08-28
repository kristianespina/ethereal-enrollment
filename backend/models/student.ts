import { sequelize } from ".";
import { Model, Optional, DataTypes } from "sequelize";
import { Course } from "../types/course";
import { Gender } from "../types/student";

export interface StudentAttributes {
  id: Number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: Date;
  sex: Gender;
  email: string;
  courses: Course[];
  studentCode: string;
  password: string;
}

export interface StudentCreationAttributes
  extends Optional<StudentAttributes, "id"> {}
interface StudentInstance
  extends Model<StudentAttributes, StudentCreationAttributes>,
    StudentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Student = sequelize.define<StudentInstance>(
  "Student",
  {
    id: {
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    middleName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    sex: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    courses: {
      allowNull: false,
      type: DataTypes.JSON,
    },
    studentCode: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Student };
