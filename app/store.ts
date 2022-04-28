import { configureStore } from "@reduxjs/toolkit"
import registrationReducer from "../features/registrationSlice"
import userReducer from "../features/userSlice"
import userLocationReducer from "../features/locationSlice"

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        user: userReducer,
        userLocation: userLocationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch