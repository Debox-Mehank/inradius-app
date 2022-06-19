import {
  faBriefcase,
  faEquals,
  faHeart,
  faHeartCircleCheck,
  faMagnifyingGlass,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DesignationEnum,
  EmployeeGenderEnum,
  User,
} from "../generated/graphql";
import { EmployerJobState } from "./job.slice";

export enum DashboardPagesEnum {
  "explore" = "explore",
  "my-interests" = "my-interests",
  "shown-interests" = "shown-interests",
  "matched" = "matched",
  "profile" = "profile",
  "jobs" = "jobs",
}

export const DashboardSidebarList: {
  employee: { title: string; page: DashboardPagesEnum; icon: IconDefinition }[];
  employer: { title: string; page: DashboardPagesEnum; icon: IconDefinition }[];
} = {
  employee: [
    {
      title: "Explore",
      page: DashboardPagesEnum.explore,
      icon: faMagnifyingGlass,
    },
    {
      title: "My Interests",
      page: DashboardPagesEnum["my-interests"],
      icon: faHeart,
    },
    {
      title: "Shown Interests",
      page: DashboardPagesEnum["shown-interests"],
      icon: faHeartCircleCheck,
    },
    { title: "Matched", page: DashboardPagesEnum.matched, icon: faEquals },
    // { title: "Profile", page: DashboardPagesEnum.profile, icon: faUser },
  ],
  employer: [
    {
      title: "Explore",
      page: DashboardPagesEnum.explore,
      icon: faMagnifyingGlass,
    },
    {
      title: "My Interests",
      page: DashboardPagesEnum["my-interests"],
      icon: faHeart,
    },
    {
      title: "Shown Interests",
      page: DashboardPagesEnum["shown-interests"],
      icon: faHeartCircleCheck,
    },
    { title: "Matched", page: DashboardPagesEnum.matched, icon: faEquals },
    // { title: "Profile", page: DashboardPagesEnum.profile, icon: faUser },
    { title: "Jobs", page: DashboardPagesEnum.jobs, icon: faBriefcase },
  ],
};

export interface InterestsEmployeeCardData {
  firstName?: string;
  lastName?: string;
  userImage?: string | null;
  location?: string;
  domain?: string;
  subDomain: string[];
  skills: string[];
  expectedPay?: number | null;
  employeeId?: string | null;
  shortDescription?: string | null;
}

export interface InterestsEmployerCardData {
  employerId?: string | null;
  jobId?: string | null;
  companyName?: string | null;
  companyImage?: string | null;
  jobTitle?: string | null;
  jobDesc?: string | null;
  jobType?: string | null;
  location?: string;
  domain?: string;
  subDomain: string[];
  skills: string[];
  minPay?: number | null;
  maxPay?: number | null;
  minRequiredExp?: { years: string; months: string } | null;
}

export interface DashboardEmployeeCardData {
  firstName?: string;
  lastName?: string;
  userImage?: string | null;
  location?: string;
  domain?: string;
  subDomain: string[];
  skills: string[];
  expectedPay?: number | null;
  score: number;
  employeeId?: string | null;
  shortDescription?: string | null;
}

export interface DashboardEmployerCardData {
  employerId?: string | null;
  jobId?: string | null;
  companyName?: string | null;
  companyImage?: string | null;
  jobTitle?: string | null;
  jobDesc?: string | null;
  jobType?: string | null;
  location?: string;
  domain?: string;
  subDomain: string[];
  skills: string[];
  minPay?: number | null;
  maxPay?: number | null;
  score: number;
  minRequiredExp?: { years: string; months: string } | null;
}

export interface DashboardEmployerState {
  companyName?: string | null | undefined;
  companyImage?: string | null | undefined;
  jobs?: EmployerJobState[];
  companyLetterHead?: string | null | undefined;
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

export interface DashboardEmployeeState {
  _id?: string | undefined | null;
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
    designation?: { label: string; value: DesignationEnum } | null;
    end?: string | null;
    start?: string | null;
    onNotice?: boolean | null;
    lastDateAtCurrentEmployer?: string | null;
    expectedJoinigDate?: string | null;
  }[];
}

export interface DashboardState {
  currentPage: DashboardPagesEnum;
  dashboardEmployer: DashboardEmployerState | null;
  dashboardEmployee: DashboardEmployeeState | null;
  dashboardUser: User | null;
  selectedJob: EmployerJobState | null;
}

const initialState: DashboardState = {
  currentPage: DashboardPagesEnum.explore,
  dashboardEmployer: null,
  dashboardEmployee: null,
  dashboardUser: null,
  selectedJob: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setInitialStateDashboardSlice: (state) => {
      state.currentPage = DashboardPagesEnum.explore;
      state.dashboardEmployer = null;
      state.dashboardUser = null;
      state.dashboardUser = null;
      state.selectedJob = null;
    },
    setCurrentPage: (state, action: PayloadAction<DashboardPagesEnum>) => {
      state.currentPage = action.payload;
    },
    setDashboardUser: (state, action: PayloadAction<User>) => {
      state.dashboardUser = action.payload;
    },
    updateDashboardUserImage: (state, action: PayloadAction<string>) => {
      state.dashboardUser = {
        ...state.dashboardUser!,
        image: action.payload,
      };
    },
    updateDashboardEmployerData: (
      state,
      action: PayloadAction<DashboardEmployerState>
    ) => {
      state.dashboardEmployer = {
        ...state.dashboardEmployer,
        ...action.payload,
      };

      if (action.payload.jobs && action.payload.jobs.length > 0) {
        state.selectedJob = action.payload.jobs[0];
      }
    },
    updateDashboardEmployeeData: (
      state,
      action: PayloadAction<DashboardEmployeeState>
    ) => {
      state.dashboardEmployee = {
        ...state.dashboardEmployee,
        ...action.payload,
      };
    },
    setSelectedJob: (state, action: PayloadAction<EmployerJobState>) => {
      state.selectedJob = action.payload;
    },
  },
});

const { actions, reducer } = dashboardSlice;

export const {
  setInitialStateDashboardSlice,
  setCurrentPage,
  setDashboardUser,
  updateDashboardUserImage,
  updateDashboardEmployerData,
  updateDashboardEmployeeData,
  setSelectedJob,
} = actions;

export default reducer;
