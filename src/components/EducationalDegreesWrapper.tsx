import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/store";

import EducationTable from "./EducationTable";
import { fetchLanguages } from "../redux/features/Languages/request";

const EducationalDegreesWrapper=()=>{
  const { data, loading, error } = useSelector((state:RootState) => state.language);
  const dispatch:any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);
  if (loading) return <div>Loading languages...</div>;
  if (error) return <div>Error: {error}</div>;
  return   <EducationTable/>
}

export default EducationalDegreesWrapper