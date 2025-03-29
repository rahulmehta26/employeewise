import React from "react";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

const NoDataPage = ({
  message = "No data available",
  subText = "There are no records to display at the moment.",
  onRefresh
}) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="mb-6 w-64 h-64">
        <img
          src="/noData.jpg"
          alt="No data"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{message}</h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">{subText}</p>

      <Button
        onClick={onRefresh}
        className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        <RefreshCw size={18} />
        Refresh Page
      </Button>
    </div>
  );
};

export default NoDataPage;
