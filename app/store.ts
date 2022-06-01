import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../features/common.slice";
import surveyReducer from "../features/survey.slice";
import employeeReducer from "../features/employee.slice";
import employerReducer from "../features/employer.slice";
import dashboardReducer from "../features/dashboard.sice";
import jobReducer from "../features/job.slice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    survey: surveyReducer,
    employee: employeeReducer,
    employer: employerReducer,
    dashboard: dashboardReducer,
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
