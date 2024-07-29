import React, { useEffect, useState } from "react";
// import AdminNavbar from './AdminNavbar'
import Flight from "./flight";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { FindFlights } from "../redux/action/data";
import { Link } from "react-router-dom";
import axios from "axios";

function Totalflight() {
  // const showflight = useSelector((state) => state.allflight.allflights);
  // console.log("Flight", showflight);



  // const handleflightDelete = async (flightId) => {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:3000/api/flights/${flightId}`
  //     );
  //     console.log("Response:", res.data);
  //     if (res.data.success) {
  //       console.log("flight deleted");
  //       toast.success("Successfully Deleted Flight");
  //       window.location.reload();
  //     } else {
  //       console.error("Product deletion failed:", res.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting product:", error.message);
  //   }
  // };
  const dispatch = useDispatch();
  const admindata = JSON.parse(localStorage.getItem("admin"));
  const adminId = admindata._id;
  const [useData, setUseData] = useState([]);

  useEffect(() => {
    const responseadmindata = async () => {
      try {
        const Response = await axios.get(
          `http://localhost:3000/api/Admin-Data/${adminId}`
        );
        console.log("response", Response.data.data.Hotels);
        const flightdata = Response.data.data.Flight;
        console.log(flightdata);
        setUseData(flightdata);
      } catch (error) {
        console.log(error);
      }
    };
    responseadmindata();
  }, []);
  
  const handleflightDelete = async (FlightId) => {
    console.log("Deleting hotel with ID:", FlightId); // Add this line
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/${adminId}/flights/${FlightId}`
      );
      console.log("Response:", res.data);
      window.location.reload();
      if (res.data.success) {
        console.log("Flight deleted successfully"); // Add this line
        toast.success("Successfully Deleted flight");
        // Remove the deleted hotel from the state
        // setUseData(prevData => prevData.filter(hotel => hotel._id !== HotelId));
        
      } 
    } catch (error) {
      console.error("Error deleting flight:", error.message);
    }
  };
  useEffect(() => {
    dispatch(FindFlights());
  }, [dispatch]);
  return (
    <>
      <Toaster richColors position="bottom-center" />

      <Flight />

      {useData.length > 0 ? (
        <>
          <div className="flex justify-center text-2xl mt-2">
            <h1>
              Total Flights :{" "}
              {useData ? useData.length : "Please Refresh the page"}
            </h1>
          </div>
          <div className="flex flex-wrap gap-10 justify-center mt-8">
          {useData.map((flight) => {
            return (
              <div className="rounded ">
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-10">
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      Flight Number:{flight.flightNumber}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      <h1 className="text-lg text-sky-950 mx-1 ">
                        Departure City : {flight.departureCity}
                      </h1>
                      <h1 className="text-lg text-sky-950 mx-1">
                        Arrival City : {flight.arrivalCity}
                      </h1>
                      <h1 className="text-lg text-sky-950 mx-1">
                        Departure Time : {flight.departureTime}
                      </h1>
                      <h1 className="text-lg text-sky-950 mx-1">
                        Departure date : {flight.departureDate}
                      </h1>
                      <h1 className="text-lg text-sky-950 mx-1">
                        AirLine : {flight.Airline}
                      </h1>
                      <h1 className="text-lg text-sky-950 mx-1">
                        Price : {flight.Price}
                      </h1>
                    </p>
                  </div>
                  <div className="p-6 pt-0 text-center">
                    <button className="border-2 rounded border-primary px-3 py-1 me-2 text-primary  "
                    >
                     <Link to={`/Update-Flight/${flight._id}`}>Edit</Link>
                    </button>
                    <button
                      className="border-2 rounded border-red-500 px-3 py-1 text-red-500 "
                      onClick={() => handleflightDelete(flight._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

        </>
      ) : (
        <>
          <h1>NO Flight Found</h1>
        </>
      )}
    </>
  );
}

export default Totalflight;
