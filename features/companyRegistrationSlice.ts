import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentAndExpectedPay, ReactSelectIndustryDependentOptionType, ReactSelectOptionType } from "../utils/custom_types";

const DEFAULT_STEPS = ["upload-documents", "job-desc" , "location-dropdown", "radius", "industry-domain", "skills", "pay"]

interface CompanyRegistrationState {
    steps: string[]
    currentStep: number
    progress: number
    industry: ReactSelectOptionType | null
    linkedin: string | null
    letterhead: string | null
    letterheadfile: FileList | null
    domain: ReactSelectIndustryDependentOptionType | null
    designation: string | null
    joiningdate: string | null
    skill1: ReactSelectIndustryDependentOptionType | null
    skill2: ReactSelectIndustryDependentOptionType | null
    skill3: ReactSelectIndustryDependentOptionType | null
    skill4: ReactSelectIndustryDependentOptionType | null
    qualification: ReactSelectOptionType | null
    frompay: string | null
    topay: string | null
    desc: string | null
    location: ReactSelectOptionType | null
    radius: number | null
    status: string
}

const initialState: CompanyRegistrationState = {
    steps: DEFAULT_STEPS,
    currentStep: 1,
    progress: 20,
    linkedin: null,
    letterhead: null,
    letterheadfile: null,
    industry: null,
    domain: null,
    designation: null,
    skill1: null,
    skill2: null,
    skill3: null,
    skill4: null,
    qualification: null,
    frompay: null,
    topay: null,
    desc: null,
    location: null,
    radius: null,
    joiningdate: null,
    status: "first job pending" //"verification pending" //"verification in-progress"
}

export const companyRegistrationSlice = createSlice({
    name: "company-registration",
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
        setLinkedIn: (state, action: PayloadAction<string>) => {
            state.linkedin = action.payload
        },
        setLetterHead: (state, action: PayloadAction<string>) => {
            state.letterhead = action.payload
        },
        setLetterHeadFile: (state, action: PayloadAction<FileList | null>) => {
            state.letterheadfile = action.payload
        },
        setIndustry: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.industry = action.payload
        },
        setDomain: (state, action: PayloadAction<ReactSelectIndustryDependentOptionType>) => {
            state.domain = action.payload
        },
        setDesignation: (state, action: PayloadAction<string>) => {
            state.designation = action.payload
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
        setQualification: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.qualification = action.payload
        },
        setFromPay: (state, action: PayloadAction<string>) => {
            state.frompay = action.payload
        },
        setToPay: (state, action: PayloadAction<string>) => {
            state.topay = action.payload
        },
        setDesc: (state, action: PayloadAction<string>) => {
            state.desc = action.payload
        },
        setLocation: (state, action: PayloadAction<ReactSelectOptionType>) => {
            state.location = action.payload
        },
        setRadius: (state, action: PayloadAction<number>) => {
            state.radius = action.payload
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setJoiningDate: (state, action: PayloadAction<string>) => {
            state.joiningdate = action.payload
        },
        setCompanyRegistrationData: (state, action: PayloadAction<CompanyRegistrationState>) => {
            console.log("ACTION SET REG DATA : " + action.payload)
            // state.progress = action.payload.progress
            // state.location = action.payload.location
        }
    }
})

export const { incrementProgress, setLocation, decrementProgress, incrementStep, decrementStep, setRadius, setIndustry, setDomain, setDesignation, setQualification, setSkill1, setSkill2, setSkill3, setSkill4, setStatus, setLinkedIn, setLetterHead, setLetterHeadFile, setJoiningDate, setDesc, setFromPay, setToPay } = companyRegistrationSlice.actions

export default companyRegistrationSlice.reducer