import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user";
import { hotelReducer,AllhotelReducer, flightReducer, AllflightReducer, CarsReducer, PackageReducer, CartReducer} from "../reducer/data";
import adminReducer, { admindataReducer } from "../reducer/admin";
import staffReducer from "../reducer/staff";



const store =configureStore({
    reducer:{
        user:userReducer,    
        hotel:hotelReducer,
        allhotel:AllhotelReducer,
        flight:flightReducer,
        allflight:AllflightReducer,
        Car:CarsReducer,
        Package:PackageReducer,
        Admin:adminReducer,
        AdminData:admindataReducer,
        Cart:CartReducer,
        Staffs:staffReducer
    }
})

export default store