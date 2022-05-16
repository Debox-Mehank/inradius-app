import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpInYearsAndMonthsType, CurrentAndExpectedPay, ReactSelectIndustryDependentOptionType, ReactSelectOptionType, WorkExpType } from "../utils/custom_types";

const DEFAULT_STEPS = ["location", "radius", "industry-domain", "qualification", "skills", "work-experience", "total-relevant-experience", "current-expected-pay", "linkedin-resume"]
// const DEFAULT_STEPS = ["location", "radius"]

interface RegistrationState {
    steps: string[]
    currentStep: number
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
    workexp: WorkExpType[]
    totalexp: ExpInYearsAndMonthsType | null
    relevantexp: ExpInYearsAndMonthsType | null
    currentpay: string | null
    expectedpay: string | null
    fresher: boolean | null
    linkedin: string | null
    resume: File | null
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
    workexp: [{ company: null, designation: null, description: null, end: null, start: null, errors: null }],
    totalexp: null,
    relevantexp: null,
    currentpay: null,
    expectedpay: null,
    linkedin: null,
    fresher: false,
    resume: null
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
        addWorkExp: (state) => {
            state.workexp.push({ company: null, designation: null, description: null, end: null, start: null, errors: null })
        },
        removeWorkExp: (state) => {
            state.workexp.pop()
        },
        setCompany: (state, action: PayloadAction<{ idx: number, company: string }>) => {
            state.workexp[action.payload.idx]['company'] = action.payload.company
        },
        setDesignation: (state, action: PayloadAction<{ idx: number, designation: ReactSelectOptionType }>) => {
            state.workexp[action.payload.idx]['designation'] = action.payload.designation
        },
        setStart: (state, action: PayloadAction<{ idx: number, start: string }>) => {
            state.workexp[action.payload.idx]['start'] = action.payload.start
        },
        setDescription: (state, action: PayloadAction<{ idx: number, description: string }>) => {
            state.workexp[action.payload.idx]['description'] = action.payload.description
        },
        setEnd: (state, action: PayloadAction<{ idx: number, end: string }>) => {
            state.workexp[action.payload.idx]['end'] = action.payload.end
        },
        setTotalExp: (state, action: PayloadAction<ExpInYearsAndMonthsType>) => {
            state.totalexp = action.payload
        },
        setRelevantExp: (state, action: PayloadAction<ExpInYearsAndMonthsType>) => {
            state.relevantexp = action.payload
        },
        setCurrentPay: (state, action: PayloadAction<string>) => {
            state.currentpay = action.payload
        },
        setExpectedPay: (state, action: PayloadAction<string>) => {
            state.expectedpay = action.payload
        },
        setLinkedIn: (state, action: PayloadAction<string>) => {
            state.linkedin = action.payload
        },
        setResume: (state, action: PayloadAction<File>) => {
            state.resume = action.payload
        },
        setFresher: (state, action: PayloadAction<boolean>) => {
            state.fresher = action.payload
        },
        setRegistrationData: (state, action: PayloadAction<RegistrationState>) => {
            console.log("ACTION SET REG DATA : " + action.payload)
            state.progress = action.payload.progress
            state.location = action.payload.location
        }
    }
})

export const { incrementProgress, setLocation, decrementProgress, incrementStep, decrementStep, setRadius, setIndustry, setDomain, setQualification, setSkill1, setSkill2, setSkill3, setSkill4, setWorkExp, addWorkExp, removeWorkExp, setCompany, setDesignation, setStart, setEnd, setTotalExp, setRelevantExp, setLinkedIn, setResume, setDescription, setCurrentPay, setExpectedPay, setFresher } = registrationSlice.actions

export default registrationSlice.reducer