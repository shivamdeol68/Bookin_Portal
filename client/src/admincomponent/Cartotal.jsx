import React, { useEffect, useState } from "react";

import Cars from "./cars";
// import AdminNavbar from './AdminNavbar'
// import Flight from "./flight";
import { useDispatch, useSelector } from "react-redux";

import { FindCars } from "../redux/action/data";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

function Cartotal() {
  // const showcar = useSelector((state) => state.Car.Cars);
  // console.log("showcar",showcar);
 
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
        console.log("response", Response.data.data.Cars);
        const cardata = Response.data.data.Cars;
        console.log(cardata);
        setUseData(cardata);
      } catch (error) {
        console.log(error);
      }
    };
    responseadmindata();
  }, []);
  

  
  const handleCarsDelete = async (CarId) => {
    console.log(CarId);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/${adminId}/car-rents/${CarId}`
      );
      console.log("Response:", res.data);
      if (res.data.success) {
        console.log("car deleted");
        toast.success("Successfully Deleted car");
        window.location.reload();
      } else {
        console.error("car deletion failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error deleting car:", error.message);
    }
  };

  useEffect(() => {
    dispatch(FindCars());
  }, [dispatch]);
  return (
    <>
      <Toaster richColors position="bottom-center" />

      <Cars />
      {useData && useData.length < 0 ? (
        <>
          <h1 className="flex justify-center mt-4">No Cars Found</h1>
        </>
      ) : (
        <>
         <div className="flex justify-center text-2xl mt-2">
            <h1>
              Total Cars :
              {useData ? useData.length : "Please Refresh the page"}
            </h1>
          </div>
         <div className="flex flex-wrap gap-10 justify-center mt-8">

          
         {useData.map((cars) => {
            return(
              <>
              <div class="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img
                  src="https://www.allprodad.com/wp-content/uploads/2022/04/06-03-22-car-ride-questions-scaled.jpg"
                  alt="ui/ux review check"
                />
              </div>
              <div class="p-6">
                <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Car Name : {cars.car}
                </h4>
                <p class="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                  <h2>Driver Name : {cars.customerName}</h2>
                  <h2>Phone Number : {cars.phoneNumber}</h2>
                  <h2>Location : {cars.Location}</h2>
                  <h2>Price Per Day : {cars.pricePerDay}</h2>
                  {/* <h2>Total Price : {cars.totalPrice}</h2> */}
                </p>
              </div>
              <div className="flex justify-center p-4">
                <button  className="border-2 rounded border-primary px-3 py-1 me-2 text-primary  "><Link to={`/Cars-Update/${cars._id}`}>Edit</Link></button>
                <button className="border-2 rounded border-red-500 px-3 py-1 text-red-500 " onClick={() => handleCarsDelete(cars._id)}>Delete</button>
              </div>
            </div>
              
              </>

            )
            
          })}
         </div>
        </>
      )}
    </>
  );
}

export default Cartotal;
