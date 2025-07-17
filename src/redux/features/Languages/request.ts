import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Language} from "./languagesSlice";
import api from "../../../services/axios";

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguages',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get<Language[]>('/api/languages');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);