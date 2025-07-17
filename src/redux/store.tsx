import {configureStore} from "@reduxjs/toolkit";
import languageReducer from './features/Languages/languagesSlice.ts'
import education from './features/Degrees/educationSlice.ts'
import { useDispatch} from "react-redux";
 export const store = configureStore({
  reducer: {
    language: languageReducer,
    education: education,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch


