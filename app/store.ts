import { configureStore } from "@reduxjs/toolkit"
import registrationReducer from "../features/registrationSlice"
import companyRegistrationReducer from "../features/companyRegistrationSlice"
import userReducer from "../features/userSlice"
import userLocationReducer from "../features/locationSlice"

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        user: userReducer,
        userLocation: userLocationReducer,
        companyRegistration: companyRegistrationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch