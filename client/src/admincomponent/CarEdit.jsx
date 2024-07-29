import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import {  updateCars } from "../redux/action/data";

function CarEdit() {
  const { CarId } = useParams();
  console.log("flightId", CarId);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCars(CarId));
  }, []);

  const memorydatas = useSelector((state) => state.Car.Cars);
  const isloading = useSelector((state) => state.Car.isloading);

  //   let where = memorydata?.product?.where
  //   console.log(where)

  console.log("Memory Data:", memorydatas); 


  const UpdateCars = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/car-rents/${CarId}`,
        data
      );

      console.log("Update-Response-Car:", response);
      navigate("/Cars-Total")

    } catch (error) {
      console.log(error);
    }
  };



  
  const [usecar, setUsecar] = useState(memorydatas?.car || "");
  console.log("car-name", usecar);
  const [usecustomerName, setUsecustomerName] = useState(
    memorydatas?.customerName|| ""
  );
  const [usephoneNumber, setUsephoneNumber] = useState(
    memorydatas?.phoneNumber || ""
  );
  const [useLocation, setUseLocation] = useState(memorydatas?.Location || "");
  const [usepricePerDay, setUsepricePerDay] = useState(
    memorydatas?.pricePerDay || ""
  );
  const [usetotalPrice, setUsetotalPrice] = useState(
    memorydatas?.totalPrice || ""
  );

  useEffect(() => {
    if (memorydatas) {
      setUsecar(memorydatas?.car || "");
      setUsecustomerName(memorydatas?.customerName || "");
      setUsephoneNumber(memorydatas?.phoneNumber || "");
      setUseLocation(memorydatas?.Location || "");
      setUsepricePerDay(memorydatas?.pricePerDay|| "");
      setUsetotalPrice(memorydatas?.totalPrice || "");
    }
  }, [memorydatas]);

  return (
    <>
      {isloading < 0 ? (
        <>
          <h1>Car not Found</h1>
        </>
      ) : (
        <>
          <div className="flex justify-center mt-16">
          <div class="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
              
              <div class="p-6 ">
                <div className="">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                      <label htmlFor="">
                   Car Name : 
                  <input
                    type="text"
                    value={usecar}
                    onChange={(e) => setUsecar(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                </div>
               
                <p class="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mt-4">
                      <label htmlFor="">
                   Customer Name : 
                  <input
                    type="text"
                    value={usecustomerName}
                    onChange={(e) => setUsecustomerName(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mt-4">
                      <label htmlFor="">
                   Phone Number : 
                  <input
                    type="text"
                    value={usephoneNumber}
                    onChange={(e) => setUsephoneNumber(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mt-4">
                      <label htmlFor="">
                   Location : 
                  <input
                    type="text"
                    value={useLocation}
                    onChange={(e) => setUseLocation(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mt-4">
                      <label htmlFor="">
                   Price Per Day : 
                  <input
                    type="text"
                    value={usepricePerDay}
                    onChange={(e) => setUsepricePerDay(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 mt-4">
                      <label htmlFor="">
                   Total Price : 
                  <input
                    type="text"
                    value={usetotalPrice}
                    onChange={(e) => setUsetotalPrice(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                </p>
              </div>
              <div className="flex justify-center p-4">
                <button
                 className="block  select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={()=>UpdateCars({ car:usecar,
                    customerName:usecustomerName,
                    phoneNumber: usephoneNumber,
                    Location: useLocation,
                    pricePerDay: usepricePerDay,
                    totalPrice: usetotalPrice})}
                >Save</button>
                   </div>
            </div>
          </div>
        
        </>
      )}
    </>
  );
}

export default CarEdit;
