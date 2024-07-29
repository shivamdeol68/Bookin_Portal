import React, { useEffect, useState } from 'react'
import Cars from './cars'
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { createCars } from "../redux/action/data";
import { Toaster, toast } from "sonner";
function PublishCar() {
  const admin=useSelector(state=>state.Admin.admin)
  const [useCarsData, setuseCarsData] = useState({
    car: "",
  customerName: "",
  phoneNumber: "",
  Location: "",
  email:admin.email,
  // dateFrom: "",
  // dateTo: "",
  pricePerDay: "",
  totalPrice: "",
  });

  //   const isloading = useSelector((state) => state.product.isloading);
  const success = useSelector((state) => state.Car.success);
  const error = useSelector((state) => state.Car.error);
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

  const handleCardata = (e) => {
    e.preventDefault();
    dispatch(createCars(useCarsData));
  };
  return (
    <>
      <Toaster richColors position="bottom-center" />
    <Cars/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Publish Cars
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Car
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={useCarsData.car}
                  onChange={(e) =>
                    setuseCarsData({
                      ...useCarsData,
                      car: e.target.value,
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
                 Driver Name
              </label>
              <div className="mt-2">
                <input           
                  type="text"
                  value={useCarsData.customerName}
                  onChange={(e) =>
                    setuseCarsData({
                      ...useCarsData,
                      customerName: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={useCarsData.phoneNumber}
                  onChange={(e) =>
                    setuseCarsData({
                      ...useCarsData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Location
              </label>
              <div className="mt-2">
                <input
                 type="text"
                  value={useCarsData.Location}
                  onChange={(e) =>
                    setuseCarsData({ ...useCarsData, Location: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Price Per Day
              </label>
              <div className="mt-2">
                <input
                 type="text"
                  value={useCarsData.pricePerDay}
                  onChange={(e) =>
                    setuseCarsData({
                      ...useCarsData,
                      pricePerDay: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Total Price
              </label>
              <div className="mt-2">
                <input
                   type="text"
                  value={useCarsData.totalPrice}
                  onChange={(e) =>
                    setuseCarsData({
                      ...useCarsData,
                      totalPrice: e.target.value,
                    })
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
                onClick={handleCardata}
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
  )
}

export default PublishCar