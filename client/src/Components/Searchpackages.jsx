import React, { useEffect, useState } from 'react'
import MainNavbar from './Navbar'
import {Button, Input} from "@nextui-org/react";
// import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FindPackages } from '../redux/action/data';

function Searchpackages() {
    const showhotels = useSelector((state) => state.Package.Package);
    console.log("showhotels", showhotels);
    const [searchTerm, setSearchTerm] = useState("");
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(FindPackages());
    }, [dispatch]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredHotels = showhotels.filter((packages) => {
      return (
        packages.Location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
  return (
    <>
     <MainNavbar/>
    
    <div className='flex
     mt-5 justify-center'>
    <Input
              classNames={{
                base: "max-w-full sm:max-w-[25rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
            //   startContent={<SearchIcon size={18} />}
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
    <Button color="primary" href="#" variant="flat" className='ml-3' >
                Search
              </Button>
    </div>
    
    <div className='flex justify-center flex-wrap  my-14'>
    
      <Link to="/Search-Hotel" className='m-4 bg-primary py-4 px-6 rounded' >
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
      <div className='m-4 bg-danger py-4 px-6  rounded'>
      <Link to="/Search-Packages" className='flex justify-center'>
      <img src="images/honeymoon.png" alt="" className='h-12 w-18 ' />
      </Link>
      <div className='text-center text-xl text-white'>
        <p>Package</p>
      </div>
      </div>
    </div>


    {
        filteredHotels.length === 0 ? (
          <><h1 className="text-2xl flex justify-center mt-10 mb-20">No vacation Packages Found</h1></>
        ):(
          <>
          <div className="mt-14 mb-14">
        <p className="text-2xl flex justify-center mb-4">Available Vacation Packages</p>
        <div className="flex flex-wrap gap-10 justify-center">
        {filteredHotels.map((packages)=>{
      return(
        <>
        <div className=''>
        <div href="#" className="items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
 
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vacation : {packages.name}</h5>
    <p> Location : {packages.Location}</p>
    <p className="">Description : {packages.description}</p>

    <p> Days : {packages.days}</p>
    <p>Cost Per Person : Rs {packages.costPerPerson} </p>
  </div>
<div className='flex justify-center p-4 '>
<button className="block  rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
<Link to={`/AddToCart/${packages._id}`}>Book Now</Link>

    </button>
 </div>
</div>



        </div>

        </>
      )
    })}
        </div>
      </div>
          </>
        )
      }

    <Footer/>
    </>
  )
}

export default Searchpackages