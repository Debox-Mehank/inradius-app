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
  }[];
  allQualifications: { _id: string; qualification: string }[];
  allBenefits: { _id: string; benefit: string }[];
}

const initialState: CommonState = {
  loading: false,
  allLocations: [],
  allIndustries: [],
  allDomains: [],
  allSubdomains: [],
  allSkills: [],
  allQualifications: [],
  allBenefits: [],
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
    addAllBenefits: (
      state,
      action: PayloadAction<
        {
          _id: string;
          benefit: string;
        }[]
      >
    ) => {
      state.allBenefits = action.payload;
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
  addAllBenefits,
} = actions;

export default reducer;
