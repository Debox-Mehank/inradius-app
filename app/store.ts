import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../features/common.slice";
import surveyReducer from "../features/survey.slice";
import employeeReducer from "../features/employee.slice";
import registrationReducer from "../features/registrationSlice";
import companyRegistrationReducer from "../features/companyRegistrationSlice";
import userReducer from "../features/userSlice";
import userLocationReducer from "../features/locationSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    survey: surveyReducer,
    employee: employeeReducer,
    // registration: registrationReducer,
    // user: userReducer,
    // userLocation: userLocationReducer,
    // companyRegistration: companyRegistrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
