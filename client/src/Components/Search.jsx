import React, { useEffect, useState } from "react";
import MainNavbar from "./Navbar";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FindHotel } from "../redux/action/data";
import Footer from "./Footer";

function Search() {
  const showhotels = useSelector((state) => state.allhotel.allhotels);
  console.log("showhotels", showhotels);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FindHotel());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotels = showhotels.filter((hotel) => {
    return (
      hotel.Location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <MainNavbar />

      <div className="flex mt-5 justify-center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[25rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button color="primary" href="#" variant="flat" className="ml-3">
          Search
        </Button>
      </div>


      <div className='flex justify-center flex-wrap  my-14'>
    
      <Link to="/Search-Hotel" className='m-4 bg-danger py-4 px-6 rounded' >
        <div className='flex justify-center'>
        <img src="images/hotel.png" alt="" className='h-12 w-18'/>
        </div>
        <div className='text-center text-xl text-white'>
        <p>Hotels</p>
      </div>
      </Link>
      <Link to="/Search-car" className='m-4 bg-primary p-4 rounded'>
      <div className='flex justify-center'>
      <img src="images/car-rent.png" alt="" className='h-12 w-18'/>
      </div>
      <div className='text-center text-xl text-white'>
        <p>Car Rental</p>
      </div>
      </Link>
      <Link to="/Search-flight" className='m-4 bg-primary py-4 px-6 rounded'>
      <div className='flex justify-center'>
      <img src="images/direct-flight.png" alt="" className='h-12 w-18'/>
      </div>
      <div className='text-center text-xl text-white'>
        <p>Flights</p>
      </div>
      </Link>
      <Link to="/Search-Packages" className='m-4 bg-primary py-4 px-6  rounded'>
      <div className='flex justify-center'>
      <img src="images/honeymoon.png" alt="" className='h-12 w-18 ' />
      </div>
      <div className='text-center text-xl text-white'>
        <p>Package</p>
      </div>
      </Link>
    </div>

      {
        filteredHotels.length === 0 ? (
          <><h1 className="text-2xl flex justify-center mt-10 mb-20">No Hotel Found</h1></>
        ):(
          <>
          <div className="mt-14 mb-14">
        <p className="text-2xl flex justify-center mb-4">Available Hotels</p>
        <div className="flex flex-wrap gap-10 justify-center">
          {filteredHotels.map((hotel) => (
           <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96" key={hotel._id}>
  <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
    <img src={hotel.ImgUrl} alt="card-image" />
  </div>
  <div className="p-6">
 
      <div className="flex justify-between mb-2">
        <h5 className="font-sans text-xl antialiased font-semibold text-blue-gray-900">{hotel.HotelName}</h5>
        <h5 className="font-sans text-xl antialiased font-semibold text-blue-gray-900"> <i class="fa-solid fa-location-dot mx-2"></i>{hotel.Location}</h5>
      </div>
      
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      {hotel.Description}
    </p>
  </div>
  <div className="p-6 pt-0">
    <button className="align-middle mx-28 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
    <Link to={`/AddToCart/${hotel._id}`}>Reserve</Link>
    </button>
  </div>
</div>

//             <div
//               className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
//               key={hotel._id}
//             >
//               <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
//                     <img
//                       src={hotel.ImgUrl}
//                       alt="ui/ux review check"
//                       className="max-h-72"
//                     />
//                     <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                   
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-3">
//                       <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         {hotel.HotelName}
//                       </h5>
//                       <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="-mt-0.5 h-5 w-5 text-yellow-700"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         {hotel.Rating}
//                       </p>
//                     </div>
//                     <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 mx-14 mt-5">
//                       <h4 className="text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         Location : {hotel.Location}
//                       </h4>
//                       <h4 className="text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         Category : {hotel.Category}
//                       </h4>
//                       <h4 className="text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         Facilities : {hotel.Facilities}
//                       </h4>
//                       <h4 className="text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         Amenities : {hotel.Amenities}
//                       </h4>
//                       <h5 className="text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
//                         Price : {hotel.Price}
//                       </h5>
//                     </p>
                    

//                     <div className="p-6 pt-3 ">
//                     <button className=" rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mx-24 mt-4" type="button">
//     <Link to={`/AddToCart/${hotel._id}`}>Reserve</Link>
// </button>


//                 </div>
//                   </div>
//             </div>
          ))}
        </div>
      </div>
          </>
        )
      }

      <Footer />
    </>
  );
}

export default Search;
