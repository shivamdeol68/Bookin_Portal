const Admin = require("../models/Admin");
const User = require("../models/user");
const {
  Hotel,
  Flight,
  CarRent,
  VacationPackage,
  CartItem,
  Cart,
  Message,
} = require("../models/data");

const createHotel = async (req, res) => {
  try {
    const {
      HotelName,
      Location,
      Category,
      Description,
      Rating,
      email,
      Facilities,
      Amenities,
      Price,
      ImgUrl,
    } = req.body;

    const hotel = new Hotel({
      HotelName,
      Location,
      Category,
      Description,
      Rating,
      Facilities,
      Amenities,
      Price,
      ImgUrl,
    });

    const Hoteldata = await hotel.save();
    console.log(Hoteldata);

    const admin = await Admin.findOne({ email });
    const adminId = admin._id;
    const updateAdminData = await Admin.findByIdAndUpdate(
      adminId,
      { $push: { Hotels: Hoteldata } },
      { new: true }
    );
    admin.Hotels = await updateAdminData;
    res.status(201).json({
      message: "Hotel created successfully successfully",
      Hoteldata: Hoteldata,
      adminhotel: updateAdminData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create hotel",
      error: error.message,
      success: false,
    });
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find();
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ hotel, success: true, message: "Hotel are here" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch hotel", error: error.message });
  }
};

const getEditHotel = async (req, res) => {
  const { HotelId } = req.params;
  try {
    // console.log("Received adminId:", adminId);
    // console.log("Received HotelId:", HotelId);
    const hotel = await Hotel.findOne({ _id: HotelId }); // Add adminId in the query
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ hotel, success: true, message: "Hotel is here" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch hotel", error: error.message });
  }
};
const updateHotel = async (req, res) => {
  const { HotelId } = req.params;
  const {
    HotelName,
    Location,
    Description,
    Category,
    Rating,
    Facilities,
    Amenities,
    Price,
    ImgUrl,
  } = req.body;
  try {
    console.log("Received HotelId:", HotelId);
    const hotel = await Hotel.findOneAndUpdate(
      { _id: HotelId },
      {
        $set: {
          HotelName: HotelName,
          Location: Location,
          Category: Category,
          Description: Description,
          Rating: Rating,
          Facilities: Facilities,
          Amenities: Amenities,
          Price: Price,
          ImgUrl: ImgUrl,
        },
      }
    );
    if (!hotel) {
      console.log("Hotel not found or unauthorized"); // Add this line for debugging
      return res
        .status(404)
        .json({ success: false, message: "Unable to find Hotel" });
    }
    console.log("Hotel updated successfully:", hotel); // Add this line for debugging
    return res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      hotel: hotel, // Include hotel details only if successful (using ternary operator)
    });
  } catch (error) {
    console.error("Error updating hotel:", error); // Add this line for debugging
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

const deleteHotel = async (req, res) => {
  const { adminId, hotelId } = req.params;
  console.log(hotelId);
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const hotelIndex = admin.Hotels.findIndex(
      (hotel) => hotel._id.toString() === hotelId
    );
    if (hotelIndex === -1) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    admin.Hotels.splice(hotelIndex, 1);
    await admin.save();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete hotel", error: error.message });
  }
};

const createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      departureCity,
      arrivalCity,
      departureTime,
      departuredate,
      email,
      Price,
      Airline,
    } = req.body;

    const flight = new Flight({
      flightNumber,
      departureCity,
      arrivalCity,
      departureTime,
      departuredate,
      Price,
      Airline,
    });

    const flightData = await flight.save();
    console.log(flightData);
    const admin = await Admin.findOne({ email });
    const adminId = admin._id;
    const updateAdminData = await Admin.findByIdAndUpdate(
      adminId,
      { $push: { Flight: flightData } },
      { new: true }
    );
    admin.Flight = await updateAdminData;
    res.status(201).json({
      message: "Flight created successfully",
      flightData: flightData,
      adminflight: updateAdminData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create flight",
      error: error.message,
      success: false,
    });
  }
};

const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.find();
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json({ flight, success: true, message: "Flight are Here" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch flight",
      error: error.message,
      success: false,
    });
  }
};

const getUpdatedFlight = async (req, res) => {
  const { FlightId } = req.params;
  console.log(FlightId);
  try {
    const flight = await Flight.findOne({ _id: FlightId });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res
      .status(200)
      .json({ success: true, flight, message: "flight are founded" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch flight",
      error: error.message,
      success: false,
    });
  }
};
const updateFlight = async (req, res) => {
  const { FlightId } = req.params;
  const {
    flightNumber,
    departureCity,
    arrivalCity,
    departureTime,
    departuredate,
    Price,
    Airline,
  } = req.body;
  try {
    const flight = await Flight.updateOne(
      { _id: FlightId },
      {
        $set: {
          flightNumber: flightNumber,
          departureCity: departureCity,
          arrivalCity: arrivalCity,
          departureTime: departureTime,
          departuredate: departuredate,
          Price: Price,
          Airline: Airline,
        },
      }
    );
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res
      .status(200)
      .json({ message: "Flight updated successfully", flight, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update flight",
      error: error.message,
      success: false,
    });
  }
};

const deleteFlight = async (req, res) => {
  const { adminId, FlightId } = req.params;
  console.log(FlightId);
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const flightIndex = admin.Flight.findIndex(
      (hotel) => hotel._id.toString() === FlightId
    );
    if (flightIndex === -1) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    admin.Flight.splice(flightIndex, 1);
    await admin.save();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete hotel", error: error.message });
  }
};

const createCarRent = async (req, res) => {
  try {
    const {
      car,
      customerName,
      phoneNumber,
      Location,
      dateFrom,
      email,
      dateTo,
      pricePerDay,
      totalPrice,
    } = req.body;

    const carRent = new CarRent({
      car,
      customerName,
      phoneNumber,
      Location,
      dateFrom,
      dateTo,
      pricePerDay,
      totalPrice,
    });

    const carRentData = await carRent.save();
    console.log(carRentData);
    const admin = await Admin.findOne({ email });
    const adminId = admin._id;
    const updateAdminData = await Admin.findByIdAndUpdate(
      adminId,
      { $push: { Cars: carRentData } },
      { new: true }
    );
    admin.Cars = await updateAdminData;
    res.status(201).json({
      message: "Car rental created successfully",
      carRentData: carRentData,
      adminCars: updateAdminData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create car rental",
      error: error.message,
      success: false,
    });
  }
};

const getCarRentById = async (req, res) => {
  try {
    const carRent = await CarRent.find();
    if (!carRent) {
      return res.status(404).json({ message: "Car rent entry not found" });
    }
    console.log(carRent);
    res
      .status(200)
      .json({ carRent, success: true, message: "Successfully fetched data" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch car rent entry",
      error: error.message,
    });
  }
};

const getUpdateCarRentById = async (req, res) => {
  const { CarRentId } = req.params;
  try {
    const carRent = await CarRent.findOne({ _id: CarRentId });
    if (!carRent) {
      return res.status(404).json({ message: "Car rent entry not found" });
    }
    res.status(200).json(carRent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch car rent entry",
      error: error.message,
    });
  }
};

const updateCarRent = async (req, res) => {
  const { CarRentId } = req.params;
  const {
    car,
    customerName,
    phoneNumber,
    Location,
    dateFrom,
    dateTo,
    pricePerDay,
    totalPrice,
  } = req.body;
  try {
    const carRent = await CarRent.updateOne(
      { _id: CarRentId },
      {
        $set: {
          car: car,
          customerName: customerName,
          phoneNumber: phoneNumber,
          Location: Location,
          dateFrom: dateFrom,
          dateTo: dateTo,
          pricePerDay: pricePerDay,
          totalPrice: totalPrice,
        },
      }
    );
    if (!carRent) {
      return res.status(404).json({ message: "Car rent entry not found" });
    }
    res
      .status(200)
      .json({ message: "Car rent entry updated successfully", carRent });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update car rent entry",
      error: error.message,
    });
  }
};

const deleteCarRent = async (req, res) => {
  const { adminId, CarRentId } = req.params;
  console.log(CarRentId);
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const carIndex = admin.Cars.findIndex(
      (car) => car._id.toString() === CarRentId
    );
    if (carIndex === -1) {
      return res.status(404).json({ message: "Car not found" });
    }

    admin.Cars.splice(carIndex, 1);
    await admin.save();
    res
      .status(200)
      .json({ message: "Car deleted successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete car", error: error.message });
  }
};

// const deleteCarRent = async (req, res) => {
//   const { CarRentId } = req.params;

//   try {
//     const carRent = await CarRent.findByIdAndDelete({ _id: CarRentId });
//     if (!carRent) {
//       return res.status(404).json({ message: "Car rent entry not found" });
//     }
//     res
//       .status(200)
//       .json({
//         message: "Car rent entry deleted successfully",
//         carRent,
//         success: true,
//       });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to delete car rent entry",
//       error: error.message,
//     });
//   }
// };

const createVactionPackage = async (req, res) => {
  try {
    const { name, description,Location, days, costPerPerson, email } = req.body;

    const PackageData = new VacationPackage({
      name,
      description,
      days,
      Location,
      costPerPerson,
    });

    const AllPackageData = await PackageData.save();
    console.log(AllPackageData);
    const admin = await Admin.findOne({ email });
    const adminId = admin._id;
    const updateAdminData = await Admin.findByIdAndUpdate(
      adminId,
      { $push: { VacationPackages: AllPackageData } },
      { new: true }
    );
    admin.VacationPackages = await updateAdminData;
    res.status(201).json({
      message: "PackageData created successfully",
      AllPackageData: AllPackageData,
      adminpacakage: updateAdminData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to create PackageData", error: error.message });
  }
};

const getVactionPackage = async (req, res) => {
  try {
    const PackageData = await VacationPackage.find();
    if (!PackageData) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res
      .status(200)
      .json({ PackageData, success: true, message: "PackageData are Here" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch PackageData",
      error: error.message,
      success: false,
    });
  }
  // try {
  //   const PackageData = await VacationPackage.find();
  //   if (!PackageData) {
  //     return res.status(404).json({ message: "Package not found" });
  //   }
  //   res.status(200).json({PackageData,success:true,message:"Packages are Here"});
  // } catch (error) {
  //   console.error(error);
  //   res
  //     .status(500)
  //     .json({ message: "Failed to fetch Package", error: error.message });
  // }
};

const getUpdatedVactionPackage = async (req, res) => {
  const { VactionPackageId } = req.params;
  console.log(VactionPackageId);
  try {
    const PackageData = await VacationPackage.findOne({
      _id: VactionPackageId,
    });
    if (!PackageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(PackageData);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch Package", error: error.message });
  }
};

const updateVactionPackage = async (req, res) => {
  const { VactionPackageId } = req.params;
  const { name, description,Location, days, costPerPerson } = req.body;
  try {
    const PackageData = await VacationPackage.updateOne(
      { _id: VactionPackageId },
      {
        $set: {
          name: name,
          description: description,
          days: days,
          Location:Location,
          costPerPerson: costPerPerson,
        },
      }
    );
    if (!PackageData) {
      return res.status(404).json({ message: "PackageData not found" });
    }
    res
      .status(200)
      .json({ message: "PackageData updated successfully", PackageData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update PackageData", error: error.message });
  }
};

const deleteVactionPackage = async (req, res) => {
  const { adminId, VactionPackageId } = req.params;
  console.log(VactionPackageId);
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const VactionPackageIndex = admin.VacationPackages.findIndex(
      (VactionPackage) => VactionPackage._id.toString() === VactionPackageId
    );
    if (VactionPackageIndex === -1) {
      return res.status(404).json({ message: "Vacation package not found" });
    }

    admin.VacationPackages.splice(VactionPackageIndex, 1); // Corrected to admin.VacationPackages
    await admin.save();
    res
      .status(200)
      .json({
        message: "Vacation package deleted successfully",
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to delete vacation package",
        error: error.message,
      });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, itemModel, adminId } = req.body;

    if (!["VacationPackage", "CarRent", "Flight", "Hotel"].includes(itemModel)) {
      return res.status(400).json({ error: "Invalid or missing itemModel" });
    }

    const user = await User.findById(userId).populate('Carts');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Check if the item is already booked by any user
    const itemAlreadyBooked = await CartItem.exists({ item: itemId });
    if (itemAlreadyBooked) {
      return res.status(400).json({ error: "Item already booked" });
    }

    // Check if the item is already in the current user's cart
    const itemInCart = user.Carts.find(cart => cart.item && cart.item._id.toString() === itemId);
    if (itemInCart) {
      return res.status(400).json({ error: "Item already in cart" });
    }


    const newCartItem = new CartItem({
      item: itemId,
      itemsModel: itemModel,
    });

    await newCartItem.save();

    user.Carts.push(newCartItem);
    await user.save();

    const cart = new Cart({
      user: userId,
      items: [newCartItem],
    });

    await cart.save();

    admin.Carts.push(cart);
    await admin.save();

    return res
      .status(200)
      .json({ success:true, message: "Item added to cart successfully", newCartItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAdminCartItems = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Step 1: Fetch the admin
    const admin = await Admin.findById(adminId)
      .populate({
        path: 'Carts',
        populate: {
          path: 'items',
          populate: {
            path: 'item',
            populate: { path: 'itemsModel' } // Populate the itemsModel field
          }
        }
      });

    // Step 2: Check if the admin exists
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Step 3: Retrieve data from each schema
    const hotels = await Hotel.find();
    const flights = await Flight.find();
    const carRentals = await CarRent.find();
    const vacationPackages = await VacationPackage.find();
    const cartItems = await CartItem.find();

    // Step 4: Return response with populated cart items and data from schemas
    return res.status(200).json({ success: true, message: "CartItems are here", admin, hotels, flights, carRentals, vacationPackages, cartItems });
  } catch (error) {
    // Step 5: Handle errors
    console.error('Error fetching admin with cart items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const sendMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newMessage = new Message({ userId, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully',newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ userId });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user along with their cart items, and populate the 'item' field
    const user = await User.findById(userId).populate({
      path: 'Carts',
      populate: { path: 'item' } // Populate the 'item' field in each 'CartItem'
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract cart items from the user object
    const cartItems = user.Carts;
    console.log(user);
    return res.status(200).json({ success: true, message: "CartItems are here", cartItems });
  } catch (error) {
    console.error('Error fetching user with cart items:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getItemModel = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Check if the item belongs to any model
    let item = null;

    // Check if the item belongs to the Hotel model
    item = await Hotel.findById(itemId);
    if (item) {
      return res.status(200).json({ success: true,items:item, itemModel: 'Hotel' });
    }

    item = await Flight.findById(itemId);
    if (item) {
      return res.status(200).json({ success: true,items:item, itemModel: 'Flight' });
    }

    // Check if the item belongs to the CarRent model
    item = await CarRent.findById(itemId);
    if (item) {
      return res.status(200).json({ success: true,items:item, itemModel: 'CarRent' });
    }

    // Check if the item belongs to the VacationPackage model
    item = await VacationPackage.findById(itemId);
    if (item) {
      return res.status(200).json({ success: true, items:item,itemModel: 'VacationPackage' });
    }

    // If the item does not belong to any model, return an error
    return res.status(404).json({ success: false, error: 'Item not found' });
  } catch (error) {
    console.error('Error getting item model:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


 
// Deletion logic
// const deleteItemFromCart = async (req, res) => {
//   try {
    

//     // Find the cart item by its ID
//     const existingCartItem = await CartItem.findById(cartItemId);
//     if (!existingCartItem) {
//       return res.status(404).json({ error: "Item not found in cart" });
//     }

//     // Find the user by their ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Find the admin by their ID
//     const admin = await Admin.findOne({ _id: adminId });
//     if (!admin) {
//       return res.status(404).json({ error: "Admin not found" });
//     }

//     // Find the cart by its ID
//     const existingCart = await Cart.findOne(cartID);
//     if (!existingCart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//   // Check if the admin is authorized to delete the cart
// const adminCartIndex = admin.Carts.findIndex(
//   (cartRef) => cartRef.toString() === cartID
// );
// console.log(adminCartIndex);
// if (adminCartIndex == -1) {
//   return res.status(401).json({ error: "Unauthorized to delete cart" });
// }

// // Remove the cart reference from the admin's carts array
// admin.Carts.splice(adminCartIndex, 1);
// await admin.save();

//     // If the cart still has items, delete the cart
//     if (existingCart.items.length >= 1) {
//       await Cart.findByIdAndDelete(cartID);
//       return res.status(200).json({ message: "Cart deleted successfully" });
//     }

//     // Find the index of the cart item in the user's carts array
//     const userCartItemIndex = user.Carts.findIndex(
//       (cartRef) => cartRef._id.toString() === cartItemId
//     );
//     if (userCartItemIndex === -1) {
//       return res.status(404).json({ error: "Item not found in user's cart" });
//     }

//     // Remove the cart item reference from the user's carts array
//     user.Carts.splice(userCartItemIndex, 1);
//     await user.save();

//     // Delete the cart item
//     await CartItem.findByIdAndDelete(cartItemId);

//     return res.status(200).json({ message: "Item deleted from cart" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
const deleteItemFromCart = async (req, res) => {
  try {
    // Find the cart by its ID
    const { cartItemId, cartId,adminId } = req.body;
    const existingCart = await Cart.findById(cartId);
    if (!existingCart) {
      console.log("Cart not found");
      return;
    }
    const cartsid=existingCart._id;
    console.log("adminiddd",cartsid);

    const user = await User.findOne({ Carts: cartItemId });
    if (!user) {
      console.log("User not found");
      return;
    }


    console.log("Cart's User ID:", existingCart.user);
    console.log("Cart's Admin ID:", existingCart);

    
    
    const admin = await Admin.findById({ _id: adminId })
    .populate("Carts");
    console.log("Admin's Carts:", admin.Carts);
    if (!admin) {
      console.log("Admin not found");
      return;
    }

 

    // Delete the cart from the user's carts array
    user.Carts.pull(cartItemId);
    await user.save();

    // Delete the cart from the admin's carts array
    admin.Carts.pull(cartId);
    await admin.save();

    // Delete the cart items associated with the cart
    await CartItem.deleteMany({ _id: { $in: existingCart.items } });

    // Delete the cart
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json( {message:"cart delete successfully"})

    console.log("Cart and associated items deleted successfully");
  } catch (error) {
    console.error("Error deleting cart and associated items:", error);
  }
};






// const deleteItemFromCart = async (req, res) => {
//   try {
//     const { userId, cartItemId, cartID, adminId } = req.body;

//     const existingCartItem = await CartItem.findById(cartItemId);
//     if (!existingCartItem) {
//       return res.status(404).json({ error: "Item not found in cart" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return res.status(404).json({ error: "Admin not found" });
//     }

//     const existingCart = await Cart.findOne(cartID);
//     console.log("Existing cart",existingCart)
//     if (!existingCart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     const adminCartIndex = admin.Carts.findIndex(
//       (cartRef) => cartRef.toString() === cartID
//     );
//     if (adminCartIndex === -1) {
//       return res.status(401).json({ error: "Unauthorized to delete cart" });
//     }
//     admin.Carts.splice(adminCartIndex, 1);
//     await admin.save();

//     if (existingCart.items.length >= 1) {
//       await Cart.findByIdAndDelete(cartID);
//       return res.status(200).json({ message: "Cart deleted successfully" });
//     }

//     const userCartItemIndex = user.Carts.findIndex(
//       (cartRef) => cartRef._id.toString() === cartItemId
//     );
//     if (userCartItemIndex === -1) {
//       return res.status(404).json({ error: "Item not found in user's cart" });
//     }
//     user.Carts.splice(userCartItemIndex, 1);
//     await user.save();

//     await CartItem.findByIdAndDelete(cartItemId);

//     return res.status(200).json({ message: "Item deleted from cart" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };














module.exports = {
  createCarRent,
  getCarRentById,
  getUpdateCarRentById,
  addToCart,
  getItemModel,
  getCartItems,
  updateCarRent,
  deleteCarRent,
  createFlight,
  getAdminCartItems,
  getFlightById,
  deleteItemFromCart,
  getUpdatedFlight,
  updateFlight,
  deleteFlight,
  sendMessage,
  createHotel,
  getHotel,
  getEditHotel,
  updateHotel,
  fetchMessages,
  deleteHotel,
  createVactionPackage,
  getVactionPackage,
  getUpdatedVactionPackage,
  updateVactionPackage,
  deleteVactionPackage,
};
