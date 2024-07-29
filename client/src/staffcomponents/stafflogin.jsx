import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { login_staff } from "../redux/action/staff";


export default function Stafflogin() {
  const [useData, setusedata] = useState({
    email: "",
    password: "",
  });

  // const isloading = useSelector((state) => state.user.isloading);
  const success = useSelector((state) => state.Staffs.success);
  console.log("Success",success);
  const error = useSelector((state) => state.Staffs.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [success, error]);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(login_staff(useData, navigate));
  };


    return (
      <>
      <Toaster
       richColors position="bottom-center" />
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your Staff account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handlesubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={useData.email}
                    onChange={(e)=>setusedata({...useData,email:e.target.value})}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={useData.password} 
                    onChange={(e)=>setusedata({...useData,password:e.target.value})}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              If you not Signin Please
              <Link to="/Signin" className="font-semibold leading-6 px-2 text-indigo-600 hover:text-indigo-500">
              Signin
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  