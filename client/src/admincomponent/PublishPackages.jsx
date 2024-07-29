import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { createFlights, createPackages } from "../redux/action/data";
import { Toaster, toast } from "sonner";
import Flight from "./flight";
import Packages from "./Package";0

function PublishPackages() {
  const admin=useSelector(state=>state.Admin.admin)

  const [usePackagesData, setusePackagesData] = useState({
    name: "",
    description:"",
    email:admin.email,
    days: "",
    Location:"",
    costPerPerson: "" 
  });

  //   const isloading = useSelector((state) => state.product.isloading);
  const success = useSelector((state) => state.Package.success);
  const error = useSelector((state) => state.Package.error);
  console.log("Error", error);
  console.log("Success", success);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [success, error]);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePackagesdata = (e) => {
    e.preventDefault();
    dispatch(createPackages(usePackagesData));
  };
  //   function handleclickproduct() {
  //     navigate("/admin");
  //   }
  return (
    <>
      <Toaster richColors position="bottom-center" />
      <Packages/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Publish Packeges
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={usePackagesData.name}
                  onChange={(e) =>
                    setusePackagesData({
                      ...usePackagesData,
                      name: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                 Location              </label>
              <div className="mt-2">
                <input           
                  type="text"
                  value={usePackagesData.Location}
                  onChange={(e) =>
                    setusePackagesData({
                      ...usePackagesData,
                      Location: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                 Description              </label>
              <div className="mt-2">
                <input           
                  type="text"
                  value={usePackagesData. description}
                  onChange={(e) =>
                    setusePackagesData({
                      ...usePackagesData,
                      description: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Days
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={usePackagesData.days}
                  onChange={(e) =>
                    setusePackagesData({
                      ...usePackagesData,
                      days: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Cost Per Person
              </label>
              <div className="mt-2">
                <input
                 type="text"
                  value={usePackagesData.costPerPerson}
                  onChange={(e) =>
                    setusePackagesData({ ...usePackagesData, costPerPerson: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handlePackagesdata}
              >
                create
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            If you already signed in, please
          </p>
        </div>
      </div>
    </>
  );
}

export default PublishPackages;
