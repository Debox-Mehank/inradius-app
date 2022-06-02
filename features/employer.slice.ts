import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployerVerifyStatusEnum } from "../generated/graphql";

export enum EMPLOYER_STEPS_ENUM {
  "employer-verification" = "employer-verification",
  "employer-details" = "employer-details",
  "employer-miscellaneous-info" = "employer-miscellaneous-info",
}

export const EMPLOYER_STEPS = [
  "employer-verification",
  "employer-details",
  "employer-miscellaneous-info",
];

export interface EmployerData {
  _id?: string | null | undefined;
  companyName?: string | null | undefined;
  companyImage?: string | null | undefined;
  companyLetterHead?: string | null | undefined;
  employerVerifyStatus?: EmployerVerifyStatusEnum | null | undefined;
  employerVerified?: boolean | null | undefined;
  linkedIn?: string | null | undefined;
  gstNo?: string | null | undefined;
  panNo?: string | null | undefined;
  registeredAddress?: string | null | undefined;
  currentAddress?: string | null | undefined;
  noOfLocations?: number | null | undefined;
  landline?: number | null | undefined;
  noOfEmployees?: number | null | undefined;
  lastTurnover?: number | null | undefined;
  noOfHiring?: number | null | undefined;
  attritionRate?: number | null | undefined;
  benefits?: { label: string; value: string }[];
}

interface EmployeeState {
  employer: EmployerData;
  currentStep: number;
  currentProgress: number;
}

const initialState: EmployeeState = {
  employer: {
    _id: null,
    companyName: null,
    companyImage: null,
    companyLetterHead: null,
    employerVerifyStatus: null,
    employerVerified: null,
    linkedIn: null,
    gstNo: null,
    panNo: null,
    registeredAddress: null,
    currentAddress: null,
    noOfLocations: null,
    landline: null,
    noOfEmployees: null,
    lastTurnover: null,
    noOfHiring: null,
    attritionRate: null,
    benefits: [],
  },
  currentProgress: 10,
  currentStep: 1,
};

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setInitialStateEmployerSlice: (state) => {
      state.currentProgress = initialState.currentProgress;
      state.currentStep = initialState.currentStep;
      state.employer = initialState.employer;
    },
    setEmployerData: (state, action: PayloadAction<EmployerData>) => {
      state.employer = action.payload;
    },
    updateEmployerData: (state, action: PayloadAction<EmployerData>) => {
      state.employer = { ...state.employer, ...action.payload };
    },
    incrementProgress: (state) => {
      if (state.currentProgress < 100) {
        state.currentProgress += 90 / EMPLOYER_STEPS.length;
      }
    },
    decrementProgress: (state) => {
      if (state.currentProgress > 10) {
        state.currentProgress -= 90 / EMPLOYER_STEPS.length;
      }
    },
    incrementStep: (state) => {
      if (state.currentStep < EMPLOYER_STEPS.length) {
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

const { actions, reducer } = employerSlice;

export const {
  setInitialStateEmployerSlice,
  setEmployerData,
  updateEmployerData,
  incrementProgress,
  incrementStep,
  decrementProgress,
  decrementStep,
} = actions;

export default reducer;
