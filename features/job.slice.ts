import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EmployerJobStatusEnum,
  EmployerJobTypeEnum,
} from "../generated/graphql";

export enum JOB_STEPS_ENUM {
  "job-type" = "job-type",
  location = "location",
  radius = "radius",
  "industry-domain" = "industry-domain",
  "subdomain-skills" = "subdomain-skills",
  qualification = "qualification",
  "min-required-experience" = "min-required-experience",
  "min-max-pay" = "min-max-pay",
}

export const JOB_STEPS = [
  "job-type",
  "location",
  "radius",
  "industry-domain",
  "subdomain-skills",
  "qualification",
  "min-required-experience",
  "min-max-pay",
];

export interface EmployerJobState {
  _id?: string;
  jobTitle?: string | null | undefined;
  jobDesc?: string | null | undefined;
  jobType?: { label: string; value: EmployerJobTypeEnum } | null | undefined;
  jobStatus?: EmployerJobStatusEnum | null | undefined;
  listingComplete?: boolean | null | undefined;
  radius?: number | null | undefined;
  latitude?: number | null | undefined;
  longitude?: number | null | undefined;
  location?: { _id: string; location: string } | null | undefined;
  qualification?: { _id: string; qualification: string } | null | undefined;
  industry?: { _id: string; industry: string } | null | undefined;
  domain?: { _id: string; domain: string } | null | undefined;
  subDomain?: { _id: string; subDomain: string }[];
  skills?: { label: string; value: string }[];
  minRequiredExp?:
    | {
        years: { label: string; value: string };
        months: { label: string; value: string };
      }
    | null
    | undefined;
  minPay?: number | null | undefined;
  maxPay?: number | null | undefined;
}

export interface JobState {
  job: EmployerJobState;
  currentProgress: number;
  currentStep: number;
}

const initialState: JobState = {
  job: {
    jobDesc: null,
    jobTitle: null,
    jobType: null,
    jobStatus: null,
    listingComplete: false,
    radius: null,
    latitude: null,
    longitude: null,
    location: null,
    qualification: null,
    industry: null,
    domain: null,
    subDomain: [],
    skills: [],
    minRequiredExp: null,
    minPay: null,
    maxPay: null,
  },
  currentProgress: 10,
  currentStep: 1,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setInitialStateJobSlice: (state) => {
      state.job = initialState.job;
      state.currentProgress = initialState.currentProgress;
      state.currentStep = initialState.currentStep;
    },
    setJobData: (state, action: PayloadAction<EmployerJobState>) => {
      state.job = action.payload;
    },
    updateJobData: (state, action: PayloadAction<EmployerJobState>) => {
      state.job = { ...state.job, ...action.payload };
    },
    incrementProgress: (state) => {
      if (state.currentProgress < 100) {
        state.currentProgress += 90 / JOB_STEPS.length;
      }
    },
    decrementProgress: (state) => {
      if (state.currentProgress > 10) {
        state.currentProgress -= 90 / JOB_STEPS.length;
      }
    },
    incrementStep: (state) => {
      if (state.currentStep < JOB_STEPS.length) {
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

const { actions, reducer } = jobSlice;

export const {
  setInitialStateJobSlice,
  setJobData,
  updateJobData,
  incrementProgress,
  decrementProgress,
  incrementStep,
  decrementStep,
} = actions;

export default reducer;
