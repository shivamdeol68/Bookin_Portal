import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { createHotel } from "../redux/action/data";
import { Toaster, toast } from "sonner";

function Publishhotel() {
  const admin=useSelector(state=>state.Admin.admin)

  const [useHotelData, setuseHotelData] = useState({
    HotelName: "",
    Location: "",
    Category: "",
    Rating: "",
    Description:"",
    email:admin.email,
    Facilities: "",
    Amenities: "",
    Price: "",
    ImgUrl: ""
  });

  //   const isloading = useSelector((state) => state.product.isloading);
  const success = useSelector((state) => state.hotel.success);
  const error = useSelector((state) => state.hotel.error);
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

  const handleHoteldata = (e) => {
    e.preventDefault();
    dispatch(createHotel(useHotelData));
  };
  //   function handleclickproduct() {
  //     navigate("/admin");
  //   }
  return (
    <>
      <Toaster richColors position="bottom-center" />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Publish Hotel
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Hotel Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={useHotelData.HotelName}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
                      HotelName: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={useHotelData.Location}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={useHotelData.Description}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
                      Description: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <input
                  id="Category"
                  type="text"
                  autoComplete="Category"
                  value={useHotelData.Category}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
                      Category: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Rating
              </label>
              <div className="mt-2">
                <input
                  id="Rating"
                  type="text"
                  autoComplete="Rating"
                  value={useHotelData.Rating}
                  onChange={(e) =>
                    setuseHotelData({ ...useHotelData, Rating: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Facilities
              </label>
              <div className="mt-2">
                <input
                  id="Facilities"
                  type="text"
                  autoComplete="Facilities"
                  value={useHotelData.Facilities}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
                      Facilities: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Amenities
              </label>
              <div className="mt-2">
                <input
                  id="Amenities"
                  
                  type="text"
                  autoComplete="Amenities"
                  value={useHotelData.Amenities}
                  onChange={(e) =>
                    setuseHotelData({
                      ...useHotelData,
                      Amenities: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="Price"
                  type="number"
                  autoComplete="Price"
                  value={useHotelData.Price}
                  onChange={(e) =>
                    setuseHotelData({ ...useHotelData, Price: e.target.value })
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Image Url
              </label>
              <div className="mt-2">
                <input
                  id="Image"
                  type="text"
                  autoComplete="Image"
                  value={useHotelData.ImgUrl}
                  onChange={(e) =>
                    setuseHotelData({ ...useHotelData, ImgUrl: e.target.value })
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
                onClick={handleHoteldata}
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

export default Publishhotel;
