import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";

function DashboardTable() {
  const admindata = JSON.parse(localStorage.getItem("admin"));
  const adminId = admindata._id;
  console.log(adminId);
  const [useData, setUseData] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/staff");
        setStaffList(response.data.findstaff);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaffData();
  }, []);
  useEffect(() => {
    const responseadmindata = async () => {
      try {
        const Response = await axios.get(
          `http://localhost:3000/api/Admin-Data/${adminId}`
        );
        const data = Response.data.data;
        setUseData(data);
      } catch (error) {
        console.log(error);
      }
    };
    responseadmindata();
  }, []);

  return (
    <>
      <AdminNavbar />

      <h1 className="text-2xl text-center font-bold mt-8">
        Welcome Back Admin - {admindata.name}
      </h1>

      {useData && (
        <>
          <div className="mt-8">
            {/* Hotels */}
            {useData.Hotels && useData.Hotels.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Hotels: {useData.Hotels?.length}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Hotel Name</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Facilities</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {useData.Hotels.map((hotel, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 text-center"
                        >
                          <td className="px-4 py-2">{hotel.HotelName}</td>
                          <td className="px-4 py-2">{hotel.Category}</td>
                          <td className="px-4 py-2">{hotel.Facilities}</td>
                          <td className="px-4 py-2">{hotel.Price}</td>
                          <td className="px-4 py-2">
                            <button className="text-primary"><Link to="/Hotel">More Info.</Link></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Flights */}
            {useData.Flight && useData.Flight.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Flights: {useData.Flight?.length}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Flight Number</th>
                        <th className="px-4 py-2">Departure City</th>
                        <th className="px-4 py-2">Arrival City</th>
                        <th className="px-4 py-2">Departure Time</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {useData.Flight.map((flight, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 text-center"
                        >
                          <td className="px-4 py-2">{flight.flightNumber}</td>
                          <td className="px-4 py-2">{flight.departureCity}</td>
                          <td className="px-4 py-2">{flight.arrivalCity}</td>
                          <td className="px-4 py-2">{flight.departureTime}</td>
                          <td className="px-4 py-2">
                            <button className="text-primary"><Link to="/Flight-Total">More Info.</Link></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cars */}
            {useData.Cars && useData.Cars.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Cars: {useData.Cars?.length}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Car Name</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Price Per Day</th>
                        <th className="px-4 py-2">Total Price</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {useData.Cars.map((car, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 text-center"
                        >
                          <td className="px-4 py-2">{car.car}</td>
                          <td className="px-4 py-2">{car.phoneNumber}</td>
                          <td className="px-4 py-2">{car.pricePerDay}</td>
                          <td className="px-4 py-2">{car.totalPrice}</td>
                          <td className="px-4 py-2">
                            <button className="text-primary"><Link to="/Cars-Total">More Info.</Link></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Vacation Packages */}
            {useData.VacationPackages &&
              useData.VacationPackages.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                  <h2 className="text-xl font-bold mb-4">
                    Vacation Packages: {useData.VacationPackages?.length}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Package Name</th>
                          <th className="px-4 py-2">Description</th>
                          <th className="px-4 py-2">Days</th>
                          <th className="px-4 py-2">Cost Per Person</th>
                          <th className="px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {useData.VacationPackages.map((pkg, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 text-center"
                          >
                            <td className="px-4 py-2">{pkg.name}</td>
                            <td className="px-4 py-2">{pkg.description}</td>
                            <td className="px-4 py-2">{pkg.days}</td>
                            <td className="px-4 py-2">{pkg.costPerPerson}</td>
                            <td className="px-4 py-2">
                              <button className="text-primary"><Link to="/Total-Packages">More Info.</Link></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            {staffList.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">
                  Staff Members: {staffList?.length}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffList.map((pkg, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 text-center"
                        >
                          <td className="px-4 py-2">{pkg._id}</td>
                          <td className="px-4 py-2">{pkg.name}</td>
                          <td className="px-4 py-2">{pkg.email}</td>
                          <td className="px-4 py-2">{pkg.role}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default DashboardTable;
