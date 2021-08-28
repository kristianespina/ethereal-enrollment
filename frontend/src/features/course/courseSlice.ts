import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Course } from "../../types/course";

const initialState: Course[] = [];

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    updateCourse: (state, action: PayloadAction<Course[]>) => {
      return action.payload;
    },
  },
});

export const { updateCourse } = courseSlice.actions;

export default courseSlice.reducer;
