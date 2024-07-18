import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/project/projectSlice";
import issueSlice from "../features/issues/issueSlice";
import projectMemberSlice from "../features/AssignProject/projectMemberSlice";
import commentSlice from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    issues: issueSlice,
    comments: commentSlice,
    projectMembers: projectMemberSlice,
  },
});
