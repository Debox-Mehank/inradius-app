import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DesignationEnum,
  EmployeeGenderEnum,
  Skill,
  User,
  UserRole,
  UserWorkExp,
} from "../generated/graphql";

export enum EMPLOYEE_STEPS_ENUM {
  location = "location",
  radius = "radius",
  "industry-domain" = "industry-domain",
  "subdomain-skills" = "subdomain-skills",
  qualification = "qualification",
  "work-experience" = "work-experience",
  "total-relevant-experience" = "total-relevant-experience",
  "current-expected-pay" = "current-expected-pay",
  "linkedin-resume" = "linkedin-resume",
  "personal-kyc" = "personal-kyc",
}

export const EMPLOYEE_STEPS = [
  "location",
  "radius",
  "industry-domain",
  "subdomain-skills",
  "qualification",
  "work-experience",
  "total-relevant-experience",
  "current-expected-pay",
  "linkedin-resume",
  "personal-kyc",
];

export interface EmployeeData {
  aadharCard?: string | null | undefined;
  shortDescription?: string | null | undefined;
  currentAddress?: string | null | undefined;
  currentPay?: number | null | undefined;
  dob?: string | null | undefined;
  domain?: { _id: string; domain: string } | null | undefined;
  expectedPay?: number | null | undefined;
  fresher?: boolean | null | undefined;
  gender?: EmployeeGenderEnum | null | undefined;
  industry?: { _id: string; industry: string } | null | undefined;
  latitude?: number | null | undefined;
  linkedIn?: string | null | undefined;
  location?: { _id: string; location: string } | null | undefined;
  longitude?: number | null | undefined;
  panCard?: string | null | undefined;
  qualification?: { _id: string; qualification: string } | null | undefined;
  radius?: number | null | undefined;
  relevantExp?:
    | {
        years: { label: string; value: string };
        months: { label: string; value: string };
      }
    | null
    | undefined;
  resume?: string | null | undefined;
  skills?: { label: string; value: string }[];
  subDomain?: { _id: string; subDomain: string }[];
  totalExp?:
    | {
        years: { label: string; value: string };
        months: { label: string; value: string };
      }
    | null
    | undefined;
  workExp?: {
    company?: string | null;
    current?: boolean | null;
    desc?: string | null;
    designation?: DesignationEnum | null;
    end?: string | null;
    start?: string | null;
  }[];
  user?: {
    _id: string;
    email: string;
    firstName: string;
    image?: string | null;
    isAccountVerified: boolean;
    isProfileCompleted: boolean;
    isSurveyCompleted: boolean;
    lastName: string;
    number: string;
    type: UserRole;
  } | null;
}

interface EmployeeState {
  employee: EmployeeData;
  currentStep: number;
  currentProgress: number;
}

const initialState: EmployeeState = {
  employee: {
    aadharCard: null,
    shortDescription: null,
    currentAddress: null,
    currentPay: null,
    dob: null,
    domain: null,
    expectedPay: null,
    fresher: false,
    gender: null,
    industry: null,
    latitude: null,
    linkedIn: null,
    location: null,
    longitude: null,
    panCard: null,
    qualification: null,
    radius: null,
    relevantExp: null,
    resume: null,
    skills: [],
    subDomain: [],
    totalExp: null,
    workExp: [
      {
        company: null,
        current: null,
        desc: null,
        designation: null,
        end: null,
        start: null,
      },
    ],
    user: null,
  },
  currentProgress: 10,
  currentStep: 1,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setInitialStateEmployeeSlice: (state) => {
      state.employee = initialState.employee;
      state.currentStep = initialState.currentStep;
      state.currentProgress = initialState.currentProgress;
    },
    setEmployeeData: (state, action: PayloadAction<EmployeeData>) => {
      state.employee = action.payload;
    },
    updateEmployeeData: (state, action: PayloadAction<EmployeeData>) => {
      state.employee = { ...state.employee, ...action.payload };
    },
    incrementProgress: (state) => {
      if (state.currentProgress < 100) {
        state.currentProgress += 90 / EMPLOYEE_STEPS.length;
      }
    },
    decrementProgress: (state) => {
      if (state.currentProgress > 10) {
        state.currentProgress -= 90 / EMPLOYEE_STEPS.length;
      }
    },
    incrementStep: (state) => {
      if (state.currentStep < EMPLOYEE_STEPS.length) {
        state.currentStep += 1;
      }
    },
    decrementStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
  },
});

const { actions, reducer } = employeeSlice;

export const {
  setInitialStateEmployeeSlice,
  setEmployeeData,
  updateEmployeeData,
  incrementProgress,
  incrementStep,
  decrementProgress,
  decrementStep,
} = actions;

export default reducer;
