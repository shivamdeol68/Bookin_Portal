import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import {  updateFlights } from "../redux/action/data";

function EditFlight() {
  const { flightId } = useParams();
  console.log("flightId", flightId);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFlights(flightId));
  }, []);

  const memorydatas = useSelector((state) => state.allflight.allflights);
  const isloading = useSelector((state) => state.allflight.isloading);

  //   let where = memorydata?.product?.where
  //   console.log(where)
 
  console.log("Memory Data:", memorydatas); 


  const updateflight = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/flights/${flightId}`,
        data
      );

      console.log("Update-Response-flight:", response);
      navigate("/Flight-Total")

    } catch (error) {
      console.log(error);
    }
  };

  
  const [usename, setUsename] = useState(memorydatas?.flightNumber || "");
  console.log("name", usename);
  const [usedepartureCity, setUsedepartureCity] = useState(
    memorydatas?.departureCity|| ""
  );
  console.log(usedepartureCity);
  const [usearrivalCity, setUsearrivalCity] = useState(
    memorydatas?.arrivalCity || ""
  );
  const [usePrice, setUsePrice] = useState(memorydatas?.Price || "");
  const [usedepartureTime, setUsedepartureTime] = useState(
    memorydatas?.departureTime || ""
  );
  const [usedeparturedate, setUsedeparturedate] = useState(
    memorydatas?.departuredate || ""
  );
  const [useAirline, setUseAirline] = useState(memorydatas?.Airline || "");

  useEffect(() => {
    if (memorydatas) {
      setUsename(memorydatas?.flightNumber || "");
      setUsedepartureCity(memorydatas?.departureCity || "");
      setUsearrivalCity(memorydatas?.arrivalCity || "");
      setUsePrice(memorydatas?.Price || "");
      setUsedepartureTime(memorydatas?.departureTime|| "");
      setUsedeparturedate(memorydatas?.departuredate || "");
      setUseAirline(memorydatas?.Airline || "");
    }
  }, [memorydatas]);

  return (
    <>
      {isloading < 0 ? (
        <>
          <h1>Flight not Found</h1>
        </>
      ) : (
        <>
        <div className="flex justify-center mt-16">
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      
                  <div className="p-6">
                  
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                      <label htmlFor="">
                   Flight Number
                  <input
                    type="text"
                    value={usename}
                    onChange={(e) => setUsename(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      
                    </div>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                      <h4>Departure City : 
                  
                  <input
                    type="text"
                    value={usedepartureCity}
                    onChange={(e) => setUsedepartureCity(e.target.value)}
                    className="border-1 mt-2 mx-8" 
                  />
                </h4>
                      <h4>Arrival City :<input
                    type="text"
                    value={usearrivalCity}
                    onChange={(e) => setUsearrivalCity(e.target.value)}
                    className="border-1 mt-2 mx-7"
                  /></h4>
                      <h4>Departure Time : <input
                    type="text"
                    value={usedepartureTime}
                    onChange={(e) => setUsedepartureTime(e.target.value)}
                    className="border-1 mt-2 mx-8"
                  /></h4>
                      <h4>Departure date : <input
                    type="text"
                    value={usedeparturedate}
                    onChange={(e) => setUsedeparturedate(e.target.value)}
                    className="border-1 mt-2 mx-5"
                  /></h4>
                  <h4>Airline : <input
                    type="text"
                    value={useAirline}
                    onChange={(e) => setUseAirline(e.target.value)}
                    className="border-1 mt-2 mx-5"
                  /></h4>
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
                      className="block  select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={()=>updateflight({ flightNumber:usename,
                        departureCity:usedepartureCity,
                        arrivalCity: usearrivalCity,
                        departureTime: usedepartureTime,
                        departuredate: usedeparturedate,
                        Price: usePrice,
                        Airline: useAirline})}
                    >
                      Save
                    </button>
                  </div>
                </div>
        </div>
        
        </>
      )}
    </>
  );
}

export default EditFlight;
