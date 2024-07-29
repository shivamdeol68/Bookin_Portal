import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { NextUIProvider} from "@nextui-org/react";

import Home from "./Home.jsx";
import Search from "./Components/Search.jsx";
import Signin from "./Components/Signin.jsx";
import Login from "./Components/Login.jsx";
import store from "./redux/store/index.js";
import VerifyOtp from "./Components/verifyotp.jsx";
import Admin from "./Components/Admin.jsx";
import Hotels from "./admincomponent/hotel.jsx";
import Edit from "./admincomponent/Edithotel.jsx";

import Cars from "./admincomponent/cars.jsx";
import Flight from "./admincomponent/flight.jsx";
import Totalflight from "./admincomponent/totalflight.jsx";
import Publishflight from "./admincomponent/Publishflight.jsx";
import EditFlight from "./admincomponent/EditFlight.jsx";
import Cartotal from "./admincomponent/Cartotal.jsx";
import PublishCar from "./admincomponent/PublishCar.jsx";
import Packages from "./admincomponent/Package.jsx";
import PublishPackages from "./admincomponent/PublishPackages.jsx";
import TotalPackages from "./admincomponent/TotalPackages.jsx";
import CarEdit from "./admincomponent/CarEdit.jsx";
import EditPackage from "./admincomponent/EditPackages.jsx";
import AdminSignin from "./admincomponent/AdminSignin.jsx";
import AdminOtp from "./admincomponent/AdminOtp.jsx";
import AdminDatalogin from "./admincomponent/AdminDatalogin.jsx";
import DashboardTable from "./admincomponent/DashboardTable.jsx";
import SearchFlights from "./Components/SearchFlights.jsx";
import SearchCar from "./Components/SearchCar.jsx";
import Searchpackages from "./Components/Searchpackages.jsx";
import CreateStaff from "./admincomponent/CreateStaff.jsx";
import StaffOtp from "./admincomponent/StaffOtp.jsx";
import Stafflogin from "./staffcomponents/stafflogin.jsx";
import Staffhome from "./staffcomponents/staffhome.jsx";
import CartChat from "./Components/CartChat.jsx";
import Carts from "./Components/Carts.jsx";
import CartItems from "./Components/CartItems.jsx";
import Addtocart from "./Components/Addtocart.jsx";
import ManageBooking from "./admincomponent/ManageBooking.jsx";
import Booking from "./staffcomponents/Booking.jsx";
import AboutPage from "./Components/About.jsx";
import Auth from "./Components/Auth.jsx";
import AdminAuth from "./admincomponent/AdminAuth.jsx";
import StaffAuth from "./staffcomponents/StaffAuth.jsx";
import NotFound from "./Components/NotFound.jsx";
// import Adminlogin from "./admincomponent/Adminlogin.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route index element={<Home/>}></Route>
        <Route path="/Search-Hotel" element={<Search />}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/Cart" element={<Auth Component={Carts}/>}></Route>
        <Route path="/Cart-Item" element={<Auth Component={CartItems}/>}></Route>
        <Route path="/Cart-Chat" element={<Auth Component={CartChat}/>}></Route>
        <Route path="/Search-flight" element={<SearchFlights />}></Route>
        <Route path="/Search-car" element={<SearchCar />}></Route>
        <Route path="/Search-Packages" element={<Searchpackages />}></Route>
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/verifyOtp" element={<VerifyOtp />}></Route>
        <Route path="/AddToCart/:ItemId" element={<Auth Component={Addtocart}/>}></Route>



        <Route path="/Staff-Chat" element={<StaffAuth Component={Staffhome}/>}></Route>
        <Route path="/Staff-Bookings" element={<StaffAuth Component={Booking}/>}></Route>
        <Route path="/Staff-login" element={<Stafflogin/>}></Route>




        <Route path="/admin" element={<AdminAuth Component={Admin}/>}></Route>
        <Route path="/Admin-deshboard" element={<AdminAuth Component={DashboardTable}/>}></Route>
        <Route path="/Admin-Bookings" element={<AdminAuth Component={ManageBooking}/>}></Route>
        <Route path="/Staff" element={<AdminAuth Component={CreateStaff}/>}></Route>
        <Route path="/Staff-Otp" element={<AdminAuth Component={StaffOtp}/>}></Route>
        <Route path="/Admin-Signin" element={<AdminAuth Component={AdminSignin}/>}></Route>
        <Route path="/Admin-login" element={<AdminAuth Component={AdminDatalogin}/>}></Route>
        <Route path="Admin-Otp" element={<AdminAuth Component={AdminOtp}/>}></Route>
        <Route path="/Hotel" element={<AdminAuth Component={Hotels}/>}></Route>
        <Route path="/Hotels/:HotelId" element={<AdminAuth Component={Edit}/>}></Route>
        <Route path="/Flight" element={<AdminAuth Component={Flight}/>}></Route>
        <Route path="/Publish-Flight" element={<AdminAuth Component={Publishflight}/>}></Route>
        <Route path="/Update-Flight/:flightId" element={<AdminAuth Component={EditFlight}/>}></Route>
        <Route path="/Flight-Total" element={<AdminAuth Component={Totalflight}/>}></Route>
        <Route path="/Cars" element={<AdminAuth Component={Cars}/>}></Route>
        <Route path="/Cars-Total" element={<AdminAuth Component={Cartotal}/>}></Route>
        <Route path="/Cars-Publish" element={<AdminAuth Component={PublishCar}/>}></Route>
        <Route path="/Cars-Update/:CarId" element={<AdminAuth Component={CarEdit}/>}></Route>
        <Route path="/Packages" element={<AdminAuth Component={Packages}/>}></Route>
        <Route path="/Package-Publish" element={<AdminAuth Component={PublishPackages}/>}></Route>
        <Route path="/Total-Packages" element={<AdminAuth Component={TotalPackages}/>}></Route>
        <Route path="/Edit-Packages/:PackageId" element={<AdminAuth Component={EditPackage}/>}></Route>
 
 <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
