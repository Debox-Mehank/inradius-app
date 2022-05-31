import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../features/common.slice";
import surveyReducer from "../features/survey.slice";
import employeeReducer from "../features/employee.slice";
import employerReducer from "../features/employer.slice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    survey: surveyReducer,
    employee: employeeReducer,
    employer: employerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
