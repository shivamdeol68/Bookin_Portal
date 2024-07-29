import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {signin } from "../redux/action/user";
import { Toaster, toast } from "sonner";

export default function Signin() {
    const [usesignin,setUsesignin]=useState({
        name:"",
        email:"",
        password:"",
        gender:""
    })

    // const isloading=useSelector((state)=>state.user.isloading)
    const success=useSelector((state)=>state.user.sucess)
    const error=useSelector((state)=>state.user.error)

    useEffect(()=>{
        if(error){
            toast.error(error)
        }
        if(success){
            toast.success(success)
        }
    },[success,error]);

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handlesignin = (e) => {
        e.preventDefault();
    dispatch(signin(usesignin, navigate));
    }
    function handleclicks() {
        navigate("/Login");
      }
    return (
      <>
        <Toaster richColors position="bottom-center"/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h1>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={usesignin.name}
            onChange={(e)=>setUsesignin({...usesignin,name:e.target.value})}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
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
                    value={usesignin.email}
                    onChange={(e)=>setUsesignin({...usesignin,email:e.target.value})}
                  
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
               
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={usesignin.password}
                    onChange={(e)=>setUsesignin({...usesignin,password:e.target.value})}
                 
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <input
                    id="Gender"
                    name="Gender"
                    type="text"
                    autoComplete="Gender"
                    value={usesignin.gender}
                    onChange={(e)=>setUsesignin({...usesignin,gender:e.target.value})}
                  
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handlesignin}>
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              If you already signed in, please
              <Link to="/Login" className="px-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={handleclicks}>
              Login
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  