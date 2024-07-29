const mongoose = require("mongoose");
const { Schema } = mongoose;
const User=require('./user')
// Hotel Schema

const HotelSchema = new Schema({
  HotelName: { type: String, required: true },
  Location: { type: String, required: true },
  Description:{type:String,required:true},
  Category: { type: String, required: true },
  dateFrom: { type: Date, required: false },
  dateTo: { type: Date, required: false },
  Rating: { type: String, required: true },
  Facilities: { type: String, required: true },
  Amenities: { type: String, required: false },
  Price: { type: Number, required: true },
  ImgUrl: { type: String, required: false },
  Feedback:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Feedback"
}]
});

const Hotel = mongoose.model("Hotel", HotelSchema);

// Flight Schema
const FlightSchema = new Schema({
  flightNumber: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  departuredate: { type: String, required: true },
  Price: { type: Number, required: true },
  Airline: { type: String, required: false },
  Feedback:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Feedback"
}]
},);

const Flight = mongoose.model("Flight", FlightSchema);

// Car Rent Schema
const CarRentSchema = new Schema({
  car: { type: String, required: true },
  customerName: { type: String, required: true },
  phoneNumber: { type: Number, unique: true, required: true },
  Location: { type: String, required: true },
  dateFrom: { type: Date, required: false },
  dateTo: { type: Date, required: false },
  pricePerDay: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  Feedback:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Feedback"
}]
});

const CarRent = mongoose.model("CarRent", CarRentSchema);


const VacationPackageSchema = new Schema({
    name: {type : String ,required:true},
    Location: {type : String ,required:true},
    description:{type:String,required:true},
    days: {type:String,required:true},
    costPerPerson: {type:Number,required:true} ,
    Feedback:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref:"Feedback"
  }]
  });
  
  const VacationPackage = mongoose.model("VacationPackage", VacationPackageSchema);


const CartItemSchema = new Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'itemsModel'
    },
    itemsModel: {
        type: String,
        required: true,
        enum: ["VacationPackage", "CarRent", "Flight", "Hotel"]
    }
});
  
  // Cart Schema
  const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [ CartItemSchema ] // Array of references to CartItem model
  });


  const messageSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    }
  });

const Message = mongoose.model('Message', messageSchema);


  
  const CartItem = mongoose.model("CartItem", CartItemSchema);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = { User, VacationPackage, CarRent, Flight, Hotel, Cart ,CartItem,Message};
