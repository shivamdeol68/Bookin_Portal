import React, { useEffect, useState } from 'react';
import MainNavbar from './Navbar';
import { Button, Input } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FindFlights } from '../redux/action/data';
import Footer from './Footer';
import { Toaster, toast } from 'sonner';

function SearchFlights() {
  const showflight = useSelector((state) => state.allflight.allflights);
  const [searchTerm, setSearchTerm] = useState({ departureCity: "", arrivalCity: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FindFlights());
  }, [dispatch]);

  const validateInput = (inputValue) => {
    const validCharacters = /^[A-Za-z\s]+$/;
    return validCharacters.test(inputValue);
  };

  const handleFindFlights = () => {
    if (!searchTerm.departureCity || !searchTerm.arrivalCity) {
      toast.warning("Please fill both input fields first.");
      return;
    }

    const isValidFrom = validateInput(searchTerm.departureCity);
    const isValidWhere = validateInput(searchTerm.arrivalCity);

    if (!isValidFrom || !isValidWhere) {
      toast.error("Input value is incorrect. Please enter valid values.");
    } else {
      dispatch(FindFlights(searchTerm));
    }
  };

  const filteredFlights = showflight.filter((flight) => {
    return (
      flight.departureCity.toLowerCase().includes(searchTerm.departureCity.toLowerCase()) &&
      flight.arrivalCity.toLowerCase().includes(searchTerm.arrivalCity.toLowerCase())
    );
  });

  const isInputEmpty = searchTerm.departureCity === "" || searchTerm.arrivalCity === "";

  return (
    <>
    <Toaster richColors  position="bottom-center" />
      <MainNavbar />

      <div className='flex mt-5 justify-center'>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Departure City"
          size="sm"
          type="search"
          value={searchTerm.departureCity}
          onChange={(e) => setSearchTerm({ ...searchTerm, departureCity: e.target.value })}
        />
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10 mx-2",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Arrival City"
          size="sm"
          type="search"
          value={searchTerm.arrivalCity}
          onChange={(e) => setSearchTerm({ ...searchTerm, arrivalCity: e.target.value })}
        />
        <Button color="primary" href="#" variant="flat" className='ml-3' onClick={handleFindFlights}>
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
    <Link to="/Search-flight" className='m-4 bg-danger py-4 px-6 rounded'>
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

{isInputEmpty ? (<>
<div>
            {showflight.length === 0 ? (
              <h1 className='text-2xl mb-8 flex justify-center'>No Flights Found</h1>
            ) : (
              <>
                <h1 className='text-2xl mb-8 flex justify-center'>Total Available Flights : {showflight.length}</h1>
                {showflight.map((flight, index) => (
                  <div key={index}>
                  <div>
                    <div className='flex flex-col md:flex-row justify-around border border-gray-300 rounded-xl bg-blue-100 my-1'>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">Flight Number</p>
                        <h5 className="text-lg font-semibold">{flight.flightNumber}</h5>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">From</p>
                        <h5 className="text-lg font-semibold">{flight.departureCity}</h5>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">Departure Time</p>
                        <h5 className="text-lg font-semibold">{flight.departureTime}</h5>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">To</p>
                        <h5 className="text-lg font-semibold">{flight.arrivalCity}</h5>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">Airline</p>
                        <h5 className="text-lg font-semibold">{flight.Airline}</h5>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 p-2">
                        <p className="text-gray-600">Price</p>
                        <h5 className="text-lg font-semibold">{flight.Price}</h5>
                      </div>
                      <div className="flex items-center justify-center p-2">
                        <button className="block px-4 py-2 text-sm text-white bg-primary rounded-md">
                        <Link to={`/AddToCart/${flight._id}`}>Book Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                

                ))}
              </>
            )}
          </div></>):(<>
   
</>)}

{!isInputEmpty && (
    <>
      {filteredFlights.length === 0 ? (
        <h1 className='text-2xl mb-8 flex justify-center'>No Flights Found</h1>
      ) : (
       <>
        {filteredFlights.map((flight, index) => (
          <div key={index} >
          <div>
            <div className='flex flex-col md:flex-row justify-around border border-gray-300 rounded-xl bg-blue-100 my-1'>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">Flight Number</p>
                <h5 className="text-lg font-semibold">{flight.flightNumber}</h5>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">From</p>
                <h5 className="text-lg font-semibold">{flight.departureCity}</h5>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">Departure Time</p>
                <h5 className="text-lg font-semibold">{flight.departureTime}</h5>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">To</p>
                <h5 className="text-lg font-semibold">{flight.arrivalCity}</h5>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">Airline</p>
                <h5 className="text-lg font-semibold">{flight.Airline}</h5>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <p className="text-gray-600">Price</p>
                <h5 className="text-lg font-semibold">{flight.Price}</h5>
              </div>
              <div className="flex items-center justify-center p-2">
                <button className="block px-4 py-2 text-sm text-white bg-primary rounded-md">
                <Link to={`/AddToCart/${flight._id}`}>Book Now</Link>

                </button>
              </div>
            </div>
          </div>
        </div>
        

        ))}
       </>
      )}
    </>
  )}
      <Footer />
    </>
  );
}

export default SearchFlights;
