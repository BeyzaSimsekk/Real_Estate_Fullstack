import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

//react-query automatically catches your data behind the scene
//each unique key has its own unique data
// return {}: returns object, not function
//useQuery({queryKey: "allProperties"}); = useQuery("allProperties");
const useProperties = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false } //otherwise it would be too much network consuming
  );
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
