import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Student } from "../../types/student";

const initialState: Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: "",
  sex: "n/a",
  studentCode: "",
  email: "",
  courses: [],
};

export const studentSlice = createSlice({
  name: "student",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateStudent: (state, action: PayloadAction<Partial<Student>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    enroll: (state, action: PayloadAction<Number>) => {
      if (!state.courses.includes(action.payload))
        state.courses.push(action.payload);
    },
    drop: (state, action: PayloadAction<Number>) => {
      state.courses.filter((course) => course !== action.payload);
    },
  },
});

export const { updateStudent, enroll } = studentSlice.actions;

export default studentSlice.reducer;
