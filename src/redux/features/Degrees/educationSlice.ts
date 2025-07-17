import { createSlice } from '@reduxjs/toolkit';

import {
  addEducation,
  deleteEducationById,
  editEducation,
  fetchEducationsData,
} from "./request";

import type { EduDegrees } from "../../../types";



interface EducationState {
  data: EduDegrees[];
  loading: boolean;
  error: string  | null;
}

const initialState: EducationState = {
  data: [],
  loading: false,
  error: "",
};

const educationSlice = createSlice({
  name: 'educationData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationsData.pending, (state:EducationState) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEducationsData.fulfilled, (state:EducationState, action: { payload: any }) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEducationsData.rejected, (state:EducationState, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error fetching education data';
      })
      .addCase(deleteEducationById.fulfilled, (state:EducationState, action) => {
        state.data = state.data.filter(item => item.id !== action.payload);
      })
      .addCase(deleteEducationById.rejected, (state:EducationState, action) => {
        state.error = action.payload ?? 'Failed to delete education';
      })
      .addCase(editEducation.fulfilled, (state:EducationState, action) => {
        const index = state.data.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editEducation.rejected, (state:EducationState, action) => {
        state.error = action.payload ?? 'Failed to edit education';
      })
      .addCase(addEducation.pending, (state:EducationState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEducation.fulfilled, (state:EducationState, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(addEducation.rejected, (state:EducationState, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to add education';
      });
  },
});

export default educationSlice.reducer;
