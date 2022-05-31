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
  Employer,
  EmployerJobStatusEnum,
  EmployerJobTypeEnum,
  EmployerVerifyStatusEnum,
} from "../generated/graphql";
import { JobState } from "./job.slice";

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
    { title: "Profile", page: DashboardPagesEnum.profile, icon: faUser },
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
    { title: "Profile", page: DashboardPagesEnum.profile, icon: faUser },
    { title: "Jobs", page: DashboardPagesEnum.jobs, icon: faBriefcase },
  ],
};

export interface DashboardEmployerState {
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
  jobs: JobState[];
}

export interface DashboardState {
  currentPage: DashboardPagesEnum;
  dashboardEmployer: DashboardEmployerState | null;
}

const initialState: DashboardState = {
  currentPage: DashboardPagesEnum.explore,
  dashboardEmployer: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<DashboardPagesEnum>) => {
      state.currentPage = action.payload;
    },
    setDashboardEmployerData: (
      state,
      action: PayloadAction<DashboardEmployerState>
    ) => {
      state.dashboardEmployer = action.payload;
    },
    updateDashboardEmployerData: (
      state,
      action: PayloadAction<DashboardEmployerState>
    ) => {
      state.dashboardEmployer = {
        ...state.dashboardEmployer,
        ...action.payload,
      };
    },
  },
});

const { actions, reducer } = dashboardSlice;

export const {
  setCurrentPage,
  setDashboardEmployerData,
  updateDashboardEmployerData,
} = actions;

export default reducer;
