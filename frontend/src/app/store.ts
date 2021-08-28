import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentSlice";
import sessionReducer from "../features/session/sessionSlice";
import courseReducer from "../features/course/courseSlice";
export const store = configureStore({
  reducer: {
    student: studentReducer,
    session: sessionReducer,
    course: courseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
