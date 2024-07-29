import React, { useState, useEffect } from "react";
import CartNavbar from "./CartNavbar";
import { useSelector } from "react-redux";
import axios from "axios";

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({ Carts: [] }); // Initialize userData with an object containing Carts property
  const userIds = useSelector((state) => state.user.user.user[0]);
  const userToken = useSelector((state) => state.user.user.user[1]);
  const usecart = userData.Carts; // Access Carts property of userData
  const [messages, setMessages] = useState([]);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const adminId = admin._id;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cart/${userIds}`
        );
        if (response.data.success && Array.isArray(response.data.cartItems)) {
          setCartItems(response.data.cartItems);
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Admin-Data/${adminId}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/fetch-messages/${userIds}`
        );

        if (response.data.success && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          console.error("Response data is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchCartItems();
    fetchAdminData();
    fetchMessages();
  }, [userIds, adminId]);

const deleteCartItem = async (cartItemId) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/cart/delete",
      {
        data: {
          adminId: adminId,
          cartItemId: cartItemId,
          cartId: usecart.length > 0 ? usecart[0]._id : null,
        },
      }
    );
    console.log(response);
    if (response.data.message) {
      // Update cart items after deletion
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== cartItemId
      );
      setCartItems(updatedCartItems);
    } else {
      console.error("Failed to delete item:", response.data.error);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

  

  return (
    <>
      <CartNavbar />
     {cartItems.length === 0 ? (<><h1 className='flex justify-center text-5xl font-extrabold mt-48'>Cart is Empty!!</h1></>):(
<>
<div className="container mx-auto mb-10">
      {cartItems.map((item) => (
        <div key={item._id} className="bg-gray-100 my-4 p-4 rounded-lg">
          {item.itemsModel === "Hotel" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Hotel</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center place-items-center ">
                <div>
                  <p className="text-gray-600">Hotel Name</p>
                  <h5 className="text-lg font-semibold">{item.item.HotelName}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <h5 className="text-lg font-semibold">{item.item.Location}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Facilities</p>
                  <h5 className="text-lg font-semibold">{item.item.Facilities}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Price</p>
                  <h5 className="text-lg font-semibold">{item.item.Price}</h5>
                </div>
                <button onClick={() => deleteCartItem(item._id)} className="h-10 w-14 bg-red-500 text-white font-semibold  px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out">
            <img src="images/recycle-bin.png" alt="" />
          </button>
              </div>
            </div>
          )}
          {item.itemsModel === "Flight" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Flight</h2>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 place-items-center text-center">
                <div>
                  <p className="text-gray-600">Flight Number</p>
                  <h5 className="text-lg font-semibold">{item.item.flightNumber}</h5>
                </div>
                <div>
                  <p className="text-gray-600">From</p>
                  <h5 className="text-lg font-semibold">{item.item.departureCity}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Departure Time</p>
                  <h5 className="text-lg font-semibold">{item.item.departureTime}</h5>
                </div>
                <div>
                  <p className="text-gray-600">To</p>
                  <h5 className="text-lg font-semibold">{item.item.arrivalCity}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Airline</p>
                  <h5 className="text-lg font-semibold">{item.item.Airline}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Price</p>
                  <h5 className="text-lg font-semibold">{item.item.Price}</h5>
                </div>
              <button onClick={() => deleteCartItem(item._id)} className="h-10 w-14 bg-red-500 text-white font-semibold  px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out">
            <img src="images/recycle-bin.png" alt="" />
          </button>
              </div>
            </div>
          )}
          {item.itemsModel === "CarRent" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Car Rented</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 place-items-center text-center">
                <div>
                  <p className="text-gray-600">Car Name</p>
                  <h5 className="text-lg font-semibold">{item.item.car}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Customer Name</p>
                  <h5 className="text-lg font-semibold">{item.item.customerName}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Contact Number</p>
                  <h5 className="text-lg font-semibold">{item.item.phoneNumber}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <h5 className="text-lg font-semibold">{item.item.Location}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Total Price</p>
                  <h5 className="text-lg font-semibold">{item.item.totalPrice}</h5>
                </div>
              <button onClick={() => deleteCartItem(item._id)} className="h-10 w-14 bg-red-500 text-white font-semibold  px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out">
            <img src="images/recycle-bin.png" alt="" />
          </button>
              </div>
            </div>
          )}
          {item.itemsModel === "VacationPackage" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">Vacation Packages</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center text-center">
                <div>
                  <p className="text-gray-600">Package Name</p>
                  <h5 className="text-lg font-semibold">{item.item.name}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Days</p>
                  <h5 className="text-lg font-semibold">{item.item.days}</h5>
                </div>
                <div>
                  <p className="text-gray-600">Cost Per Person</p>
                  <h5 className="text-lg font-semibold">{item.item.costPerPerson}</h5>
                </div>
              <button onClick={() => deleteCartItem(item._id)} className="h-10 w-14 bg-red-500 text-white font-semibold  px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out">
            <img src="images/recycle-bin.png" alt="" />
          </button>
              </div>
            </div>
          )}
          {/* Delete button for each item */}
       
        </div>
      ))}
    </div>
</>

     )}

    </>
  );
}

export default CartItems;
