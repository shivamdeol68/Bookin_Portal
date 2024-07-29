import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { admin_verifyOtp } from "../redux/action/admin";

export default function AdminOtp() {
    const [useotp, setUseotp] = useState("");

    // const isloading = useSelector((state) => state.user.isloading);
    const sucess = useSelector((state) => state.Admin.sucess);
    const error = useSelector((state) => state.Admin.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (error) {
        toast.error(error);
      }
      if (sucess) {
        toast.success(sucess);
      }
    }, [sucess, error]);
  
    const handlesubmitotp = (e) => {
      e.preventDefault();
      dispatch(admin_verifyOtp(useotp, navigate));
    };
    return (
      <>
      <Toaster richColors position="bottom-center" />
        
        <div className="flex min-h-full flex-1 flex-col justify-center mt-16 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center">
              Please Verify Your Otp ?
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handlesubmitotp}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Verify Your Otp
                </label>
                <div className="mt-2">
                  <input
                    id="Otp"
                    name="Otp"
                    type="text"
                    autoComplete="Otp"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={useotp}
                onChange={(e) => setUseotp(e.target.value)}
                  />
                </div>
              </div>
  
              
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  
               >
                  Verify Now
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              If you not Signin Please
              <button className="font-semibold leading-6 px-2 text-indigo-600 border-0 hover:text-indigo-500">
                Resend Otp
              </button>
            </p>
          </div>
        </div>
      </>
    )
  }
  