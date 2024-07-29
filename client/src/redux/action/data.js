import axios from "axios";
axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials=true;
import { toast } from "sonner";

// Action types
export const HOTEL_CREATE_REQUEST = "HOTEL_CREATE_REQUEST";
export const HOTEL_CREATE_SUCCESS = "HOTEL_CREATE_SUCCESS";
export const HOTEL_CREATE_FAILURE = "HOTEL_CREATE_FAILURE";
export const HOTEL_UPDATE_REQUEST = "HOTEL_UPDATE_REQUEST";
export const HOTEL_UPDATE_SUCCESS = "HOTEL_UPDATE_SUCCESS";
// export const HOTEL_UPDATE_FAILURE = "HOTEL_CREATE_FAILURE";
export const HOTEL_FIND_REQUEST = "HOTEL_FIND_REQUEST";
export const HOTEL_FIND_SUCCESS = "HOTEL_FIND_SUCCESS";
export const HOTEL_FIND_FAILURE = "HOTEL_FIND_FAILURE";
// export const HOTEL_DELETE_REQUEST = "HOTEL_CREATE_REQUEST";
// export const HOTEL_DELETE_SUCCESS = "HOTEL_CREATE_SUCCESS";
export const ADDCART_REQUEST = "ADDCART_REQUEST";
export const ADDCART_SUCCESS = "ADDCART_SUCCESS";
export const ADDCART_FAILURE = "ADDCART_FAILURE";

export const FLIGHT_CREATE_REQUEST = "FLIGHT_CREATE_REQUEST";
export const FLIGHT_CREATE_SUCCESS = "FLIGHT_CREATE_SUCCESS";
export const FLIGHT_CREATE_FAILURE = "FLIGHT_CREATE_FAILURE";
export const FLIGHT_UPDATE_REQUEST = "FLIGHT_UPDATE_REQUEST";
export const FLIGHT_UPDATE_SUCCESS = "FLIGHT_UPDATE_SUCCESS";
export const FLIGHT_FIND_REQUEST = "FLIGHT_FIND_REQUEST";
export const FLIGHT_FIND_SUCCESS = "FLIGHT_FIND_SUCCESS";
export const FLIGHT_FIND_FAILURE = "FLIGHT_FIND_FAILURE";
// export const Flight_DELETE_REQUEST = "HOTEL_CREATE_REQUEST";
// export const Flight_DELETE_SUCCESS = "HOTEL_CREATE_SUCCESS";

export const CARS_CREATE_REQUEST = "CARS_CREATE_REQUEST";
export const CARS_CREATE_SUCCESS = "CARS_CREATE_SUCCESS";
export const CARS_CREATE_FAILURE = "CARS_CREATE_FAILURE";
export const CARS_UPDATE_REQUEST = "CARS_UPDATE_REQUEST";
export const CARS_UPDATE_SUCCESS = "CARS_UPDATE_SUCCESS";
export const CARS_FIND_REQUEST = "CARS_FIND_REQUEST";
export const CARS_FIND_SUCCESS = "CARS_FIND_SUCCESS";
export const CARS_FIND_FAILURE = "CARS_FIND_FAILURE";


export const PACKAGE_CREATE_REQUEST = "PACKAGE_CREATE_REQUEST";
export const PACKAGE_CREATE_SUCCESS = "PACKAGE_CREATE_SUCCESS";
export const PACKAGE_CREATE_FAILURE = "PACKAGE_CREATE_FAILURE";
export const PACKAGE_UPDATE_REQUEST = "PACKAGE_UPDATE_REQUEST";
export const PACKAGE_UPDATE_SUCCESS = "PACKAGE_UPDATE_SUCCESS";
export const PACKAGE_FIND_REQUEST = "PACKAGE_FIND_REQUEST";
export const PACKAGE_FIND_SUCCESS = "PACKAGE_FIND_SUCCESS";
export const PACKAGE_FIND_FAILURE = "PACKAGE_FIND_FAILURE";



// Action creator for creating a hotel
export const createHotel = (hotelData) => async (dispatch) => {
  dispatch({ type: HOTEL_CREATE_REQUEST });
  try {
    const res = await axios.post("/api/hotels", hotelData);
    console.log("RES",res.data);
    if (res.data.success) {
      dispatch({ type: HOTEL_CREATE_SUCCESS, payload: res.data,success:true });
      // toast.success("Hotel created ");
      // You can perform additional actions here if needed
      
    } else {
      dispatch({ type: HOTEL_CREATE_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: HOTEL_CREATE_FAILURE, payload: error.message });
    // toast.error("An error occurred while creating the hotel");
  }
};

export const UpdateHotel = (hotelId) => async (dispatch) => {
  dispatch({ type: HOTEL_UPDATE_REQUEST });
  try {
    const res = await axios.get(`/api/edit-hotels/${hotelId}`);
    console.log("RES", res);
    dispatch({
      type: HOTEL_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // dispatch({
    //   type:ACTION_PRODUCT_ERROR,payload:res.data.error
    // })
    console.log(error);
  }
};


export const FindHotel = (findhotel) => async (dispatch) => {
  dispatch({ type: HOTEL_FIND_REQUEST });
  try {
    const res = await axios.get("/api/hotels", findhotel);
    console.log("get", res);
    if (res.data.success) {
      dispatch({
        type: HOTEL_FIND_SUCCESS,
        payload: { hotel: res.data.hotel, message: res.data.message },
        
      });
      toast.success(res.data.message);
      localStorage.setItem("Hotel", JSON.stringify(res.data.hotel));
    } 
    else {
      dispatch({ type: HOTEL_FIND_FAILURE, payload: res.data.message });
      toast.error(res.data.message);

    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOTEL_FIND_FAILURE,
      payload: error.response.data.error,
    });
  }
};



export const createFlights = (flightData) => async (dispatch) => {
  dispatch({ type: FLIGHT_CREATE_REQUEST });
  try {
    const res = await axios.post("/api/flights", flightData);
    console.log("RES-flight",res.data);
    if (res.data.success) {
      dispatch({ type: FLIGHT_CREATE_SUCCESS, payload: res.data,success:true,message:"Flight create successfully" });
      // toast.success("Hotel created ");
      // You can perform additional actions here if needed
      
    } else {
      dispatch({ type: FLIGHT_CREATE_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: FLIGHT_CREATE_FAILURE, payload: error.message,success:false });
    // toast.error("An error occurred while creating the hotel");
  }
};

export const updateFlights = (flightId) => async (dispatch) => {
  dispatch({ type: FLIGHT_UPDATE_REQUEST });
  try {
    const res = await axios.get(`/api/flights/${flightId}`);
    console.log("RES-flight-update", res);
    dispatch({
      type:FLIGHT_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const FindFlights = (findflight) => async (dispatch) => {
  dispatch({ type: FLIGHT_FIND_REQUEST });
  try {
    const res = await axios.get("/api/flights", findflight);
    console.log("get-flight", res.data.flight);
    if (res.data.success) {
      dispatch({
        type: FLIGHT_FIND_SUCCESS,
        payload: { flight: res.data.flight, message: res.data.message ,success:true},       
      });
      toast.success(res.data.message);
      localStorage.setItem("Flight", JSON.stringify(res.data.flight));
    } 
    else {
      dispatch({ type: FLIGHT_FIND_FAILURE, payload: res.data.message });
      toast.error(res.data.message);

    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: FLIGHT_FIND_FAILURE,
      payload: error.response.data.error,
    });
  }
};






export const createCars = (CarsData) => async (dispatch) => {
  dispatch({ type: CARS_CREATE_REQUEST });
  try {
    const res = await axios.post("/api/car-rents", CarsData);
    console.log("RES-Cars",res.data);
    if (res.data.success) {
      dispatch({ type: CARS_CREATE_SUCCESS, payload: res.data,success:true,message:res.data.message });
      toast.success(res.data.message);
    } else {
      dispatch({ type: CARS_CREATE_FAILURE, payload: res.data.error});
      toast.error(res.data.error);
    }
  } catch (error) {
    dispatch({ type: CARS_CREATE_FAILURE, payload: error.message,success:false });
  }
};

export const updateCars = (CarId) => async (dispatch) => {
  dispatch({ type: CARS_UPDATE_REQUEST });
  try {
    const res = await axios.get(`/api/car-rents/${CarId}`);
    console.log("RES-flight-update", res);
    dispatch({
      type: CARS_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const FindCars = (findCars) => async (dispatch) => {
  dispatch({ type: CARS_FIND_REQUEST });
  try {
    const res = await axios.get("/api/car-rents", findCars);
    console.log("get-Cars", res.data);
    if (res.data.success) {
      dispatch({
        type: CARS_FIND_SUCCESS,
        payload: { Rentedcars: res.data.carRent, message: res.data.message ,success:true},       
      });
      toast.success(res.data.message);
      localStorage.setItem("Cars", JSON.stringify(res.data.carRent));
    } 
    else {
      dispatch({ type: CARS_FIND_FAILURE, payload: res.data.message });
      toast.error(res.data.message);

    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: CARS_FIND_FAILURE,
      payload: error.response.data.error,
    });
  }
};




export const createPackages = (packageData) => async (dispatch) => {
  dispatch({ type: PACKAGE_CREATE_REQUEST });
  try {
    const res = await axios.post("/api/Vacation-Packages", packageData);
    console.log("RES-package",res.data);
    if (res.data.success) {
      dispatch({ type: PACKAGE_CREATE_SUCCESS, payload: res.data,success:true,message:res.data.message });
      toast.success(res.data.message);
    } else {
      dispatch({ type: PACKAGE_CREATE_FAILURE, payload: res.data.error});
      toast.error(res.data.error);
    }
  } catch (error) {
    dispatch({ type: PACKAGE_CREATE_FAILURE, payload: error.message });
  }
};

export const updatePackages = (packageId) => async (dispatch) => {
  dispatch({ type: PACKAGE_UPDATE_REQUEST });
  try {
    const res = await axios.get(`/api/Vacation-Packages/${packageId}`);
    console.log("RES-flight-update", res.data);
    dispatch({
      type: PACKAGE_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const FindPackages = (findpackage) => async (dispatch) => {
  dispatch({ type: PACKAGE_FIND_REQUEST });
  try {
    const res = await axios.get("/api/Vacation-Packages", findpackage);
    console.log("get-package", res.data);
    if (res.data.success) {
      dispatch({
        type: PACKAGE_FIND_SUCCESS,
        payload: { Package: res.data.PackageData, message: res.data.message ,success:true},       
      });
      toast.success(res.data.message);
      localStorage.setItem("Package", JSON.stringify(res.data.PackageData));
    } 
    else {
      dispatch({ type: PACKAGE_FIND_FAILURE, payload: res.data.message });
      toast.error(res.data.message);

    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: PACKAGE_FIND_FAILURE,
      payload: error.response.data.error,
    });
  }

};


export const addtoCart = (data,navigate) => async (dispatch) => {
  dispatch({ type: ADDCART_REQUEST });
  try {
    const res = await axios.post("/api/add",data);
    console.log("RES",res.data);
    if (res.data.success) {
      dispatch({ type: ADDCART_SUCCESS, payload:{carts:res.data.newCartItem,success:true ,message:res.data.message}});

      navigate("/Search-Hotel")
    } else {
      dispatch({ type: ADDCART_FAILURE, payload: res.data.message });
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch({ type: ADDCART_FAILURE, payload: error.message });
  }
};

