import { sequelize } from ".";
import { Model, Optional, DataTypes } from "sequelize";

interface CourseAttributes {
  id: Number;
  code: string;
  name: string;
  units: Number;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, "id"> {}
export interface CourseInstance
  extends Model<CourseAttributes, CourseCreationAttributes>,
    CourseAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Course = sequelize.define<CourseInstance>(
  "Course",
  {
    id: {
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    units: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Course };
