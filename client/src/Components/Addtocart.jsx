import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addtoCart } from '../redux/action/data';
import { Toaster, toast } from "sonner";
import { admindata } from '../redux/action/admin';

function Addtocart() {   
    const { ItemId } = useParams();
    const userIds = useSelector((state) => state.user.user.user[0]);
    console.log(userIds);
    const admin = useSelector(state => state.Admin.admin);
    console.log("admin",admin)
    const adminId=admin?._id;
    console.log(adminId);
    const success = useSelector(state => state.Cart.success);
    const error = useSelector(state => state.Cart.error);

    const [itemModel, setItemModel] = useState('');
    const [item, setItem] = useState(null); // State to store the item details

    useEffect(() => {
        const fetchItemAndModel = async () => {
            try {
                // Fetch the item details
                const itemResponse = await axios.get(`http://localhost:3000/api/item/${ItemId}`);
                console.log(itemResponse.data);
                setItem(itemResponse.data.items);
                
                // Extract and set the item model
                setItemModel(itemResponse.data.itemModel);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        
        fetchItemAndModel();
    }, [ItemId]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const data = {
            itemId: ItemId,
            itemModel: itemModel,
            userId: userIds,
            adminId: adminId
        };
        dispatch(addtoCart(data, navigate));
    };

    useEffect(()=>{
      dispatch(admindata())
    },[dispatch])
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
        }
    }, [success, error]);

    return (
        <>
            <Toaster richColors position="bottom-center" />
            <div className="flex flex-col  ">
            {item && (
    <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 w-full flex flex-col md:flex-row">
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          src={
            itemModel === 'Hotel'
              ? item.ImgUrl
              : itemModel === 'CarRent'
              ? 'https://www.allprodad.com/wp-content/uploads/2022/04/06-03-22-car-ride-questions-scaled.jpg'
              : itemModel === 'VacationPackage'
              ? 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2023/05/10054553/12-Flexible-Companies-That-Help-Pay-for-Your-Vacation-1024x512.jpg'
              : 'https://assets.gqindia.com/photos/6540e2ba4622f7146b12b76b/16:9/w_2560%2Cc_limit/best-time-to-book-flights.jpg'
          }
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center md:ml-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800 text-center">
          {itemModel === 'Hotel'
            ? 'Hotel'
            : itemModel === 'CarRent'
            ? 'Car Rental'
            : itemModel === 'VacationPackage'
            ? 'Vacation Package'
            : 'Flight Details'}
        </h1>
        <div className="text-gray-700">
          {itemModel === 'Hotel' && (
            <>
              <p className="mb-2 text-lg ">
                <span className="font-semibold">Hotel Name:</span> {item.HotelName}
              </p>
              <p className="mb-2 text-lg ">
                <span className="font-semibold">Description:</span> {item.Description}
              </p>
              <p className="mb-2 text-lg ">
                <span className="font-semibold">Location:</span> {item.Location}
              </p>
              <p className="mb-2 text-lg ">
                <span className="font-semibold">Facilities:</span> {item.Facilities}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Price:</span> {item.Price}
              </p>
              
            </>
          )}
          {itemModel === 'CarRent' && (
            <>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Car Name:</span> {item.car}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Driver Name:</span> {item.customerName}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Contact Number:</span> {item.phoneNumber}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Total Price:</span> {item.totalPrice}
              </p>
            </>
          )}
          {itemModel === 'VacationPackage' && (
            <>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Name:</span> {item.name}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Days:</span> {item.days}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Cost Per Person:</span> {item.costPerPerson}
              </p>
            </>
          )}
          {itemModel === 'Flight' && (
            <>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Flight Number:</span> {item.flightNumber}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">From:</span> {item.departureCity}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Departure Time:</span> {item.departureTime}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">To:</span> {item.arrivalCity}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Airline:</span> {item.Airline}
              </p>
              <p className="mb-2 text-lg text-center">
                <span className="font-semibold">Price:</span> {item.Price}
              </p>
            </>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 mx-auto transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )}

</div>
  
        </>
    );
}

export default Addtocart;
