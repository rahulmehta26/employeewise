import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const Pagination = ({ count, handleNextPage, handlePrevPage }) => {
  return (
    <div className="flex items-center my-4 gap-2">
      <ArrowLeftCircle className=" size-8 cursor-pointer " onClick={handlePrevPage} />
      <span className="px-4 py-2 text-2xl ">{count}</span>
      <ArrowRightCircle className=" size-8 cursor-pointer " onClick={handleNextPage} />
    </div>
  );
};

export default Pagination;
