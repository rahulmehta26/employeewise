/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { logoutUser } from "@/features/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, Search, Menu, X } from "lucide-react";
import { setSearchQuery } from "@/features/searchSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container") && !event.target.closest(".menu-button")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setTimeout(() => {
        navigate("/login");
        toast.success("Logged out successfully");
      });
    } catch (e) {
      toast.error("Failed to Logout");
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full font-poppins">
      {/* Main Navbar */}
      <nav className="w-full h-16 border-b flex items-center justify-between px-4 md:px-[5%] bg-white z-10 relative">
        <div className="">
          <h1 className="font-semibold">EmployeeWise</h1>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <Button
            className="flex gap-2 cursor-pointer items-center bg-red-500 hover:bg-red-600 transition-all duration-300"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Log Out
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Container with dynamic height */}
      <div 
        className={`md:hidden mobile-menu-container overflow-hidden transition-all duration-300 ease-in-out bg-white z-20 shadow-lg border-b rounded-b-2xl`}
        style={{ 
          maxHeight: isMenuOpen ? '10rem' : '0px',
          opacity: isMenuOpen ? 1 : 0
        }}
      >
        <div className="py-6 px-5">
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <Button
              className="flex gap-2 cursor-pointer items-center justify-center bg-red-500 hover:bg-red-600 py-3 transition-all duration-300"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Log Out
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Navbar;