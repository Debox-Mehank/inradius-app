import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum UserType {
    employee = "Employee",
    employer = "Employer"
}

export interface UserState {
    firstName: string | null
    lastName: string | null
    companyName: string | null
    phoneNumber: number | null
    email: string | null
    type: UserType.employee | UserType.employer | null
    password: string | null
}

const initialState: UserState = {
    firstName: null,
    lastName: null,
    companyName: null,
    phoneNumber: null,
    email: null,
    type: null,
    password: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // setUserFirstName: (state, action: PayloadAction<string>) => {
        //     state.firstName = action.payload
        // },
        // setUserLastName: (state, action: PayloadAction<string>) => {
        //     state.lastName = action.payload
        // },
        // setUserCompanyName: (state, action: PayloadAction<string>) => {
        //     state.companyName = action.payload
        // },
        // setUserPhoneNumber: (state, action: PayloadAction<number>) => {
        //     state.phoneNumber = action.payload
        // },
        // setUserEmail: (state, action: PayloadAction<string>) => {
        //     state.email = action.payload
        // },
        // setUserType: (state, action: PayloadAction<UserType>) => {
        //     state.type = action.payload
        // },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.companyName = action.payload.companyName
            state.phoneNumber = action.payload.phoneNumber
            state.email = action.payload.email
            state.type = action.payload.type
            state.password = action.payload.password
        }
    }
})

export const {
    setUser
} = userSlice.actions

export default userSlice.reducer