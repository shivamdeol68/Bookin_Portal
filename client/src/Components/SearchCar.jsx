import React, { useEffect, useState } from 'react'
import MainNavbar from './Navbar'
import {Button, Input} from "@nextui-org/react";
// import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FindCars } from '../redux/action/data';

function SearchCar() {

    const showcars = useSelector((state) => state.Car.Cars);
    console.log("showcars", showcars);
    const [searchTerm, setSearchTerm] = useState("");
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(FindCars());
    }, [dispatch]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredcars = showcars.filter((car) => {
      return (
        car.Location.toLowerCase().includes(searchTerm.toLowerCase())
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
              value={searchTerm}
          onChange={handleSearchChange}
            //   startContent={<SearchIcon size={18} />}
              type="search"
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
    <Link to="/Search-car" className='m-4 bg-danger p-4 rounded'>
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
    filteredcars.length===0?(<><h1 className='text-2xl  flex justify-center mb-16'>No Car Found</h1></>):(<>
     <div className='mt-14 mb-14'>
    <p className='text-2xl mb-8 flex justify-center'>Available Rides</p>
<div className='flex flex-wrap gap-10 justify-center '> 
{filteredcars.map((cars)=>{
    return (
        <>
        <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
  <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
    <img src="https://www.allprodad.com/wp-content/uploads/2022/04/06-03-22-car-ride-questions-scaled.jpg" alt="ui/ux review check" />
  </div>
  <div className="p-6">
    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Car Name : {cars.car}
    </h4>
    <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
    </p><h2>Driver Name : {cars.customerName}</h2>
    <h2>Location : {cars.Location}</h2>

    <h2>Phone Number : {cars.phoneNumber}</h2>
    <h2>Price Per Day : {cars.pricePerDay}</h2>
    {/* <h2>Total Price : {cars.totalPrice}</h2> */}
    <p />
  </div>
  <div className="flex items-center justify-between p-6">
    <div className="flex items-center -space-x-3">
      <img alt="natali craig" src="https://media.istockphoto.com/id/1303145841/photo/attractive-male-driver-using-the-gps-navigation-map-on-the-car.webp?b=1&s=170667a&w=0&k=20&c=3txtifqRelfTIWtlQfoXsnPdeFvPYrCUqrM98FHKG8A=" className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
      <img alt="Tania Andrew" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10" />
    </div>
    <button className="block  rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
    <Link to={`/AddToCart/${cars._id}`}>Book Now</Link>
    </button>
  </div>
</div>

        </>
    )
})}
</div>
</div>
    </>)
   }


<Footer/>
    </>
  )
}

export default SearchCar