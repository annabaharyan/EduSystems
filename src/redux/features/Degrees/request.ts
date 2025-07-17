import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

import type { AddEducationPayload, EduDegrees, UpdateEducationPayload } from "../../../types";


export const fetchEducationsData = createAsyncThunk(
  'education/fetchEducations',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get<EduDegrees[]>('/api/educational-degrees');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteEducationById = createAsyncThunk<number, number>(
  'education/deleteById',
  async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/educational-degrees/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const editEducation = createAsyncThunk<
  EduDegrees,
  UpdateEducationPayload
>(
  "education/editEducation",
  async ({ id, start_date, end_date, translations }, { rejectWithValue }) => {
    try {
      const response = await api.put<EduDegrees>(`/api/educational-degrees/${id}`, {
        start_date,
        end_date,
        translations,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update education");
    }
  }
);

export const addEducation = createAsyncThunk<
  EduDegrees,
  AddEducationPayload
>(
  "education/addEducation",
  async ({ start_date, end_date, translations }, { rejectWithValue }) => {
    try {
      const response = await api.post<EduDegrees>("/api/educational-degrees", {
        start_date,
        end_date,
        translations,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add education");
    }
  }
);