import {createSlice} from '@reduxjs/toolkit';
import {fetchLanguages} from "./request.ts";
import type {RootState} from "../../store.tsx";

export interface Language {
  id: number;
  name: string;
  slug: 'us' | 'am' | 'ru';
  default: 1 | 0;
  status: number;
  published: number;
  delete_at: null | string;
}

interface LanguageState {
  data: Language[];
  loading: boolean;
  error: string  | null;
}

const initialState: LanguageState = {
  data: [],
  loading: false,
  error: "",
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state:LanguageState) => {
        state.loading=true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state:LanguageState, action:any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state:LanguageState, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      });
  },
});

export const selectDefaultLang = (state: RootState): string | undefined =>
  state.language.data.find((lang) => lang.default === 1)?.slug;
export default languageSlice.reducer;
