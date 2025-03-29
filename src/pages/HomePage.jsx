import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/features/userSlice";
import { LoaderIcon } from "lucide-react";
import PaginationComponent from "@/components/Pagination";
import UserTable from "@/components/UserTable";
import UserCard from "@/components/UserCard";
import { useSearchParams } from "react-router-dom";
import NoDataPage from "@/components/NoData";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [pageNumber, setPageNumber] = useState(pageFromUrl);

  const dispatch = useDispatch();

  const { users, isLoading } = useSelector((state) => state.users);
  const searchQuery = useSelector((state) => state.search.query);

  useEffect(() => {
    setSearchParams({ page: pageNumber });
    dispatch(fetchUsers(pageNumber));
  }, [dispatch, pageNumber, setSearchParams]);

  useEffect(() => {
    setPageNumber(pageFromUrl);
  }, [pageFromUrl]);

  const handleNextPage = () => {
    if (pageNumber < users?.total_pages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const filteredUsers =
    searchQuery.trim() === ""
      ? users?.data || []
      : users?.data.filter((user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="p-[4%] lg:px-[5%] lg:py-[3%] h-[calc(100vh-4rem)]">
      <h1 className="text-2xl lg:text-5xl font-semibold">
        Welcome to User Management
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center">
            Loading <LoaderIcon className="animate-spin ml-2" />
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <NoDataPage onRefresh={handleRefresh} />
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="mt-10 hidden lg:block ">
            <UserTable users={filteredUsers} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:hidden">
            <UserCard users={filteredUsers} />
          </div>

          <div className="w-full flex items-center justify-center">
            <PaginationComponent
              count={pageNumber}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default HomePage;
