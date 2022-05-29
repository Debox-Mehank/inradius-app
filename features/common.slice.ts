import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
  loading: boolean;
  allLocations: { _id: string; location: string }[];
  allIndustries: { _id: string; industry: string }[];
  allDomains: { _id: string; domain: string }[];
  allSubdomains: {
    _id: string;
    subDomain: string;
    domain: { _id: string; domain: string };
  }[];
  allSkills: {
    _id: string;
    skill: string;
    subDomain: { _id: string; subDomain: string };
  }[];
  allQualifications: { _id: string; qualification: string }[];
}

const initialState: CommonState = {
  loading: false,
  allLocations: [],
  allIndustries: [],
  allDomains: [],
  allSubdomains: [],
  allSkills: [],
  allQualifications: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    addAllLocations: (
      state,
      action: PayloadAction<{ _id: string; location: string }[]>
    ) => {
      state.allLocations = action.payload;
    },
    addAllIndustries: (
      state,
      action: PayloadAction<{ _id: string; industry: string }[]>
    ) => {
      state.allIndustries = action.payload;
    },
    addAllDomains: (
      state,
      action: PayloadAction<{ _id: string; domain: string }[]>
    ) => {
      state.allDomains = action.payload;
    },
    addAllSubdomains: (
      state,
      action: PayloadAction<
        {
          _id: string;
          subDomain: string;
          domain: { _id: string; domain: string };
        }[]
      >
    ) => {
      state.allSubdomains = action.payload;
    },
    addAllSkills: (
      state,
      action: PayloadAction<
        {
          _id: string;
          skill: string;
          subDomain: { _id: string; subDomain: string };
        }[]
      >
    ) => {
      state.allSkills = action.payload;
    },
    addAllQualifications: (
      state,
      action: PayloadAction<
        {
          _id: string;
          qualification: string;
        }[]
      >
    ) => {
      state.allQualifications = action.payload;
    },
  },
});

const { actions, reducer } = commonSlice;

export const {
  toggleLoading,
  addAllLocations,
  addAllIndustries,
  addAllDomains,
  addAllSubdomains,
  addAllSkills,
  addAllQualifications,
} = actions;

export default reducer;
