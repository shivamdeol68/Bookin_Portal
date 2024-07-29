import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { updatePackages } from "../redux/action/data";

function EditPackage() {
  const { PackageId } = useParams();
  console.log("flightId", PackageId);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePackages(PackageId));
  }, []);

  const memorydatas = useSelector((state) => state.Package.Package);
  const isloading = useSelector((state) => state.Package.isloading);

  //   let where = memorydata?.product?.where
  //   console.log(where)

  console.log("Memory Data:", memorydatas); 


  const updatepack = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/Vacation-Packages/${PackageId}`,
        data
      );

      console.log("Update-Response-Package:", response);
      navigate("/Total-Packages")

    } catch (error) {
      console.log(error);
    }
  };

  
  const [usename, setUsename] = useState(memorydatas?.name || "");
  console.log("name", usename);
  const [usedescription, setUsedescription] = useState(
    memorydatas?.description|| ""
  );
  const [useLocation, setUseLocation] = useState(
    memorydatas?.Location|| ""
  );
  console.log(usedescription);
  const [usedays, setUsedays] = useState(
    memorydatas?.days || ""
  );
  const [usecostPerPerson, setUsecostPerPerson] = useState(memorydatas?.costPerPerson|| "");


  useEffect(() => {
    if (memorydatas) {
      setUsename(memorydatas?.name || "");
      setUseLocation(memorydatas?.Location || "");
      setUsedescription(memorydatas?.description || "");
      setUsedays(memorydatas?.days || "");
      setUsecostPerPerson(memorydatas?.costPerPerson || "");
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
                   Name
                  <input
                    type="text"
                    value={usename}
                    onChange={(e) => setUsename(e.target.value)}
                    className="border-1 max-w-24 mx-4 "
                  />
                </label>
                      </h5>
                      
                    </div>
                    <h4>Location:<input
                    type="text"
                    value={useLocation}
                    onChange={(e) => setUseLocation(e.target.value)}
                    className="border-1 mt-2 mx-7"
                  /></h4>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                      <h4>Description : 
                  
                  <input
                    type="text"
                    value={usedescription}
                    onChange={(e) => setUsedescription(e.target.value)}
                    className="border-1 mt-2 mx-8" 
                  />
                </h4>
                      <h4>Days :<input
                    type="text"
                    value={usedays}
                    onChange={(e) => setUsedays(e.target.value)}
                    className="border-1 mt-2 mx-7"
                  /></h4>
                      <h4>Cost Per Person : <input
                    type="text"
                    value={usecostPerPerson}
                    onChange={(e) => setUsecostPerPerson(e.target.value)}
                    className="border-1 mt-2 mx-8"
                  /></h4>
                     
                    </p>
                    
                  </div>
                  <div className="p-6 pt-3">
                    <button
                      className="block  select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={()=>updatepack({ name:usename,
                        description:usedescription,
                        Location:useLocation,
                        days:usedays,
                        costPerPerson:usecostPerPerson,
                        })}
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

export default EditPackage;
