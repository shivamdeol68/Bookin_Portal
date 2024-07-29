const express = require("express"); 
const router = express.Router();
const {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
  createFlight,
  getFlightById,
  updateFlight,
  deleteFlight,
  createCarRent,
  getCarRentById,
  updateCarRent,
  deleteCarRent,
  createVactionPackage,
  getVactionPackage,
  updateVactionPackage,
  deleteVactionPackage,
  getEditHotel,
  getUpdatedFlight,
  getUpdateCarRentById,
  getUpdatedVactionPackage,
  addToCart,
  deleteItemFromCart,
  getCartItems,
  getItemModel,
  getAdminCartItems,
  sendMessage,
  fetchMessages,
} = require("../controller/data");


router.post('/send-message', sendMessage);
router.get('/fetch-messages/:userId',fetchMessages);

router.post('/add', addToCart);
router.delete("/cart/delete", deleteItemFromCart);
router.get("/Item/:itemId", getItemModel);
router.get("/adminData/:adminId", getAdminCartItems);
router.get("/cart/:userId", getCartItems);
// Hotel Routes
router.post("/hotels", createHotel);
router.get("/hotels", getHotel);
router.post("/hotels/:HotelId", updateHotel);
router.get("/edit-hotels/:HotelId", getEditHotel);
router.delete('/:adminId/hotels/:hotelId', deleteHotel);

// Flight Routes
router.post("/flights", createFlight);
router.get("/flights", getFlightById);
router.get("/flights/:FlightId", getUpdatedFlight);
router.post("/flights/:FlightId", updateFlight);
router.delete("/:adminId/flights/:FlightId", deleteFlight);

// Car Rent Routes
router.post("/car-rents", createCarRent);
router.get("/car-rents", getCarRentById);
router.get("/car-rents/:CarRentId", getUpdateCarRentById);
router.post("/car-rents/:CarRentId", updateCarRent);
router.delete("/:adminId/car-rents/:CarRentId", deleteCarRent);

//Vacation-Package Routes
router.post("/Vacation-Packages", createVactionPackage);
router.get("/Vacation-Packages", getVactionPackage);
router.get("/Vacation-Packages/:VactionPackageId", getUpdatedVactionPackage);
router.post("/Vacation-Packages/:VactionPackageId", updateVactionPackage);
router.delete("/:adminId/Vacation-Packages/:VactionPackageId", deleteVactionPackage);

module.exports = router;
