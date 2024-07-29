import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { UpdateHotel } from "../redux/action/data";

function Edit() {
  const { HotelId } = useParams();
  console.log("HotelId", HotelId);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  // const admindata = JSON.parse(localStorage.getItem("admin"));
  // const adminId = admindata._id;
  useEffect(() => {
    dispatch(UpdateHotel(HotelId));
  }, []);

  const memorydata = useSelector((state) => state.allhotel.allhotels);
  const isloading = useSelector((state) => state.allhotel.isloading);

  //   let where = memorydata?.product?.where
  //   console.log(where)

  console.log("Memory Data:", memorydata); 


  const updateproduct = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/hotels/${HotelId}`,
        data
      );

      console.log("Update-Response:", response);
      navigate("/Hotel")

    } catch (error) {
      console.log(error);
    }
  };

  const [usename, setUsename] = useState(memorydata?.HotelName || "");
  const [useDescription, setDescription] = useState(memorydata?.Description || "");
  console.log("name", usename);
  const [uselocation, setUselocation] = useState(
    memorydata?.Location || ""
  );
  console.log(uselocation);
  const [usecategory, setUsecategory] = useState(
    memorydata?.hotel?.Category || ""
  );
  const [usePrice, setUsePrice] = useState(memorydata?.Price || "");
  const [useRating, setUseRating] = useState(memorydata?.Rating || "");
  const [useFacilities, setUseFacilities] = useState(
    memorydata?.Facilities || ""
  );
  // const [useAmenities, setUseAmentities] = useState(
  //   memorydata?.Amenities || ""
  // );
  const [useimage, setUseimage] = useState(memorydata?.ImgUrl || "");

  useEffect(() => {
    if (memorydata) {
      setUsename(memorydata?.HotelName || "");
      setDescription(memorydata?.Description || "");
      setUselocation(memorydata?.Location || "");
      setUsecategory(memorydata?.Category || "");
      setUsePrice(memorydata?.Price || "");
      setUseRating(memorydata?.Rating || "");
      setUseFacilities(memorydata?.Facilities || "");
      // setUseAmentities(memorydata?.Amenities || "");
      setUseimage(memorydata?.ImgUrl || "");
    }
  }, [memorydata]);

  return (
    <>
      {isloading < 0 ? (
        <>
          <h1>Product not Found</h1>
        </>
      ) : (
        <>
        <div className="flex justify-center mt-16">
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      
                  <div className="p-6">
                  <label htmlFor="">
                    Image Url : 
                    <input
                      type="text"
                      value={useimage}
                      onChange={(e) => setUseimage(e.target.value)}
                      className="border-1 mx-4"
                    />
                  </label>
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                      <label htmlFor="">
                  Hotel Name
                  <input
                    type="text"
                    value={usename}
                    onChange={(e) => setUsename(e.target.value)}
                    className="border-1 max-w-42 "
                  />
                </label>
                      </h5>
                      <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="-mt-0.5 h-5 w-5 text-yellow-700"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <label htmlFor="">
                  Rating
                  <input
                    type="text"
                    value={useRating}
                    onChange={(e) => setUseRating(e.target.value)}
                    className="border-1 max-w-12"
                  />
                </label>
                      </p>
                    </div>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                      <h4>Location : 
                  
                  <input
                    type="text"
                    value={uselocation}
                    onChange={(e) => setUselocation(e.target.value)}
                    className="border-1 mt-2 mx-8" 
                  />
                </h4>
                <h4>Description : 
                  
                  <input
                    type="text"
                    value={useDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-1 mt-2 mx-8" 
                  />
                </h4>
                      <h4>Category :<input
                    type="text"
                    value={usecategory}
                    onChange={(e) => setUsecategory(e.target.value)}
                    className="border-1 mt-2 mx-7"
                  /></h4>
                      <h4>Facilities : <input
                    type="text"
                    value={useFacilities}
                    onChange={(e) => setUseFacilities(e.target.value)}
                    className="border-1 mt-2 mx-8"
                  /></h4>
                      {/* <h4>Amenities : <input
                    type="text"
                    value={useAmenities}
                    onChange={(e) => setUseAmentities(e.target.value)}
                    className="border-1 mt-2 mx-5"
                  /></h4> */}

                      <h5>Price : <input
                    type="text"
                    value={usePrice}
                    onChange={(e) => setUsePrice(e.target.value)}
                    className="border-1 mt-2 mx-14"
                  /></h5>
                    </p>
                    
                  </div>
                  <div className="p-6 pt-3">
                    <button
                      className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={()=>updateproduct({HotelName: usename, Location: uselocation,Description:useDescription, Price: usePrice, Rating: useRating, Facilities: useFacilities,ImgUrl:useimage,Category:usecategory})}
                    >
                      Save
                    </button>
                  </div>
                </div>
        </div>
          {/* <div className="container mt-5 mb-5 text-center">
            <div className="">
              <form action="" className="">
                <label htmlFor="">
                  From..
                  <input
                    type="text"
                    value={usename}
                    onChange={(e) => setUseFrom(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  Going To..
                  <input
                    type="text"
                    value={useWhere}
                    onChange={(e) => setUseWhere(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  Price
                  <input
                    type="number"
                    value={usePrice}
                    onChange={(e) => setUsePrice(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  date
                  <input
                    type="date"
                    value={useDate}
                    onChange={(e) => setUseDate(e.target.value)}
                  />
                </label>
                <label htmlFor="">
                  Contact Number
                  <input
                    type="tel"
                    value={useContectNum}
                    onChange={(e) => setUseContectNum(e.target.value)}
                  />
                </label>
              </form>
            </div>
            <div>
              <Link to={"/TotalRides"} className="btn btn-outline-danger">
                Cancel
              </Link>
              <Link
                to={"/TotalRides"}
                className="btn btn-outline-success"
                onClick={() =>
                  updateproduct({
                    from: useFrom,
                    where: useWhere,
                    price: usePrice,
                    date: useDate,
                    contectnum: useContectNum,
                  })
                }
              >
                Save
              </Link>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}

export default Edit;
