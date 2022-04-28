import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserLocationType {
    // city: string | null,
    // country_code: string | null,
    // country_name: string | null,
    latitude: number | null,
    longitude: number | null,
    // state: string | null
}

const initialState: UserLocationType = {
    // city: null,
    // country_code: null,
    // country_name: null,
    latitude: null,
    longitude: null,
    // state: null
}

export const locationSlice = createSlice({
    name: "userLocation",
    initialState,
    reducers: {
        setUserLocation: (state, action: PayloadAction<UserLocationType>) => {
            // state.city = action.payload.city
            // state.country_code = action.payload.country_code
            // state.country_name = action.payload.country_name
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
            // state.state = action.payload.state
        }
    }
})

export const {
    setUserLocation
} = locationSlice.actions

export default locationSlice.reducer