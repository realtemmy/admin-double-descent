import React from "react";
import { Spinner } from "@material-tailwind/react";

export const MediumLoader = () => {
  return (
    <div className="flex items-center w-full h-full justify-center z-30">
      <Spinner color="teal" className="h-16 w-16" />
    </div>
  );
}

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
      <Spinner color="teal" className="h-16 w-16 text-teal-900/50" />
    </div>
  );
};

export default Loader;
