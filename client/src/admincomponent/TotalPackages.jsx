import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import Packages from './Package';
import { FindPackages } from '../redux/action/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

function TotalPackages() {
    // const showPackages = useSelector((state) => state.Package.Package);
    // console.log("showcars", showPackages);
  
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
          console.log("response", Response.data.data.VacationPackages);
          const flightdata = Response.data.data.VacationPackages;
          console.log(flightdata);
          setUseData(flightdata);
        } catch (error) {
          console.log(error);
        }
      };
      responseadmindata();
    }, []);

    // const handlePackageDelete = async (PacakageId) => {
    //   console.log("Deleting hotel with ID:", PacakageId); // Add this line
    //   try {
    //     const res = await axios.delete(
    //       `http://localhost:3000/api/${adminId}/Vacation-Packages/${PacakageId}`
    //     );
    //     console.log("Response delete:", res.data);
    //     // window.location.reload();
    //     if (res.data.success) {
    //       console.log("Hotel deleted successfully"); // Add this line
    //       toast.success("Successfully Deleted Hotel");
    //       // Remove the deleted hotel from the state
          // setUseData(prevData => prevData.filter(Package => Package._id !== PacakageId));
          
    //     } 
    //   } catch (error) {
    //     console.error("Error deleting hotel:", error.message);
    //   }
    // };
    const handlePackageDelete = async (PackageId) => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/${adminId}/Vacation-Packages/${PackageId}`
        );
        console.log("Response:", res.data);
        if (res.data.success) {
          console.log("Package deleted");
          toast.success("Successfully Deleted Package");
          setUseData(prevData => prevData.filter(Package => Package._id !== PackageId));
          const updatedResponse = await axios.get(
            `http://localhost:3000/api/Admin-Data/${adminId}`
          );
          const updatedData = updatedResponse.data.data.VacationPackages;
          console.log(updatedData,"update");
          setUseData(updatedData);
        } else {
          console.error("Failed to delete package:", res.data.message);
        }
      } catch (error) {
        console.error("Error deleting package:", error.message);
      }
    };
    
  useEffect(() => {
    dispatch(FindPackages());
  }, [dispatch]);
  return (  
    <>
      <Toaster richColors position="bottom-center" />

    <Packages/>
    {useData && useData.length > 0 ? (<>
    <div className='flex flex-wrap gap-10 justify-center mt-8'>
    {useData.map((packages)=>{
      return(
        <>
        <div className=''>
        <div href="#" className="items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
 
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vacation : {packages.name}</h5>
    <p className="">Description : {packages.description}</p>

    <p> Days : {packages.days}</p>
    <p>Cost Per Person : Rs {packages.costPerPerson} </p>
  </div>
<div className='flex justify-around p-4 '>
  <button className="border-2 rounded border-primary px-3 py-1 text-primary  "  ><Link to={`/Edit-Packages/${packages._id}`}>Edit</Link></button>
  <button className="border-2 rounded border-red-500 px-3 py-1 text-red-500 " onClick={()=>handlePackageDelete(packages._id)}>Delete</button>
</div>
</div>



        </div>

        </>
      )
    })}
    </div>
    </>):(<><h1>no package found</h1></>)}
    </>
  )
}

export default TotalPackages