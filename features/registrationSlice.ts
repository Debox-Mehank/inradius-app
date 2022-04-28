import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactSelectIndustryDependentOptionType, ReactSelectOptionType, WorkExpType } from "../utils/custom_types";

const DEFAULT_STEPS = ["location", "radius", "industry-domain", "qualification", "skills", "work-experience", "total-relevant-experience", "current-expected-pay", "linkedin-resume"]
// const DEFAULT_STEPS = ["location", "radius"]

interface RegistrationState {
    steps: string[],
    currentStep: number,
    progress: number
    location: ReactSelectOptionType | null
    radius: number | null
    industry: ReactSelectOptionType | null
    domain: ReactSelectIndustryDependentOptionType | null
    qualification: ReactSelectOptionType | null
    skill1: ReactSelectIndustryDependentOptionType | null
    skill2: ReactSelectIndustryDependentOptionType | null
    skill3: ReactSelectIndustryDependentOptionType | null
    skill4: ReactSelectIndustryDependentOptionType | null
    workexp: WorkExpType[] | []
}

const initialState: RegistrationState = {
    steps: DEFAULT_STEPS,
    currentStep: 1,
    progress: 10,
    location: null,
    radius: null,
    industry: null,
    domain: null,
    qualification: null,
    skill1: null,
    skill2: null,
    skill3: null,
    skill4: null,
    workexp: []
}

export const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        incrementProgress: (state) => {
            if (state.progress < 100) {
                state.progress += 90 / state.steps.length;
            }
        },
        decrementProgress: (state) => {
            if (state.progress > 10) {
                state.progress -= 90 / state.steps.length;
            }
        },
        incrementStep: (state) => {
            if (state.currentStep < state.steps.length) {
                state.currentStep += 1;
            }
        },
        decrementStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        setLocation: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.location = action.payload
        },
        setRadius: (state, action: PayloadAction<number>) => {
            state.radius = action.payload
        },
        setIndustry: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.industry = action.payload
        },
        setDomain: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.domain = action.payload
        },
        setQualification: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.qualification = action.payload
        },
        setSkill1: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.skill1 = action.payload
        },
        setSkill2: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.skill2 = action.payload
        },
        setSkill3: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.skill3 = action.payload
        },
        setSkill4: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.skill4 = action.payload
        },
        setWorkExp: (state, action: PayloadAction<WorkExpType[]>) => {
            state.workexp = action.payload
        },
        setRegistrationData: (state, action: PayloadAction<RegistrationState>) => {
            console.log("ACTION SET REG DATA : " + action.payload)
            state.progress = action.payload.progress
            state.location = action.payload.location
        }
    }
})

export const { incrementProgress, setLocation, decrementProgress, incrementStep, decrementStep, setRadius, setIndustry, setDomain, setQualification, setSkill1, setSkill2, setSkill3, setSkill4 } = registrationSlice.actions

export default registrationSlice.reducer