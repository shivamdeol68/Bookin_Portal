import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { createFlights } from "../redux/action/data";
import { Toaster, toast } from "sonner";
import Flight from "./flight";

function Publishflight() {
  const admin=useSelector(state=>state.Admin.admin)

  const [useFlightData, setuseFlightData] = useState({
    flightNumber: "",
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    email:admin.email,
    departuredate: "",
    Price: "",
    Airline: "",
  });

  //   const isloading = useSelector((state) => state.product.isloading);
  const success = useSelector((state) => state.flight.success);
  const error = useSelector((state) => state.flight.error);
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

  const handleFlightdata = (e) => {
    e.preventDefault();
    dispatch(createFlights(useFlightData));
  };
  //   function handleclickproduct() {
  //     navigate("/admin");
  //   }
  return (
    <>
      <Toaster richColors position="bottom-center" />
      <Flight/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Publish Flight
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Flight Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={useFlightData.flightNumber}
                  onChange={(e) =>
                    setuseFlightData({
                      ...useFlightData,
                      flightNumber: e.target.value,
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
                 Departure City
              </label>
              <div className="mt-2">
                <input           
                  type="text"
                  value={useFlightData. departureCity}
                  onChange={(e) =>
                    setuseFlightData({
                      ...useFlightData,
                      departureCity: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Arrival City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={useFlightData.arrivalCity}
                  onChange={(e) =>
                    setuseFlightData({
                      ...useFlightData,
                      arrivalCity: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Departure Time
              </label>
              <div className="mt-2">
                <input
                 type="text"
                  value={useFlightData.departureTime}
                  onChange={(e) =>
                    setuseFlightData({ ...useFlightData, departureTime: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
              Dparture date
              </label>
              <div className="mt-2">
                <input
                 type="date"
                  value={useFlightData.departuredate}
                  onChange={(e) =>
                    setuseFlightData({
                      ...useFlightData,
                      departuredate: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                AirLine
              </label>
              <div className="mt-2">
                <input
                   type="text"
                  value={useFlightData.Airline}
                  onChange={(e) =>
                    setuseFlightData({
                      ...useFlightData,
                      Airline: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={useFlightData.Price}
                  onChange={(e) =>
                    setuseFlightData({ ...useFlightData, Price: e.target.value })
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
                onClick={handleFlightdata}
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

export default Publishflight;
