import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Survey, UserSurveyInput } from "../generated/graphql";

export interface SurveyState {
  surveys: UserSurveyInput[];
  surveyLists: Survey[];
  surveyIndex: number;
}

const initialState: SurveyState = {
  surveys: [],
  surveyLists: [],
  surveyIndex: 0,
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setInitialStateSurveySlice: (state) => {
      state.surveys = initialState.surveys;
      state.surveyIndex = initialState.surveyIndex;
      state.surveyLists = initialState.surveyLists;
    },
    addSurvey: (state, action: PayloadAction<UserSurveyInput>) => {
      const checkIndex = state.surveys.findIndex(
        (el) => el.survey === action.payload.survey
      );
      if (checkIndex === -1) {
        state.surveys.push(action.payload);
      } else {
        state.surveys[checkIndex].selectedOption =
          action.payload.selectedOption;
      }
    },
    setSurveyLists: (state, action: PayloadAction<Survey[]>) => {
      state.surveyLists = action.payload;
    },
    nextSurvey: (state) => {
      if (state.surveyIndex !== state.surveyLists.length - 1) {
        state.surveyIndex += 1;
      }
    },
    prevSurvey: (state) => {
      if (state.surveyIndex > 0) {
        state.surveyIndex -= 1;
      }
    },
  },
});

const { actions, reducer } = surveySlice;

export const {
  setInitialStateSurveySlice,
  addSurvey,
  setSurveyLists,
  nextSurvey,
  prevSurvey,
} = actions;

export default reducer;
