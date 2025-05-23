import { Input } from "@/components/ui/input";
import rightSide from "../assets/Right Side.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/authSlice";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (data.email.trim().length === 0) {
      toast.error("Email is required");
      return;
    }

    if (data.password.trim().length === 0) {
      toast.error("Password is required");
      return;
    }

    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[100vh] px-5 lg:px-0">
      <form
        onSubmit={handleFormSubmit}
        className="w-full lg:w-1/2 flex mt-10 lg:mt-0 items-center"
      >
        <div className="w-full max-w-xl py-5 lg:p-5 rounded-md mx-auto flex flex-col gap-5">
          <h1 className="text-3xl lg:text-5xl font-semibold text-center">
            Welcome Back👋
          </h1>
          <p className="text-center text-gray-500 w-full">
            Welcome back to EmployeeWise. Login to continue
          </p>
          <div className="max-w-xl flex flex-col justify-center px-5 lg:px-0">
            <div className="w-full md:w-[80%] mx-auto flex flex-col gap-1">
              <label htmlFor="" className="font-semibold">
                Email
              </label>
              <Input
                className="max-w-md focus:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-2xl placeholder:text-zinc-400 py-5"
                placeholder="Enter your Email"
                onChange={handleChange}
                name="email"
                value={data.email}
              />
            </div>
          </div>

          <div className="max-w-xl flex flex-col justify-center px-5 lg:px-0">
            <div className="w-full md:w-[80%] mx-auto flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <div className="relative max-w-md">
                <Input
                  className="w-full focus:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-2xl placeholder:text-zinc-400 py-5 pr-12"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 cursor-pointer right-4 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-xl flex justify-center px-5 lg:px-0 mt-4">
            <Button className="w-full md:w-[80%] cursor-pointer rounded-2xl bg-red-500 hover:bg-red-400 py-5">
              {isLoading ? (
                <>
                  Loading <LoaderIcon className="animate-spin ml-2" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="w-full hidden lg:block lg:w-1/2 h-[100vh]">
        <img src={rightSide} alt="Right Side" className="w-full h-full" />
      </div>
    </div>
  );
}
export default LoginPage;
