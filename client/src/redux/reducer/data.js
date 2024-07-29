
import {
  HOTEL_CREATE_REQUEST,
  HOTEL_CREATE_SUCCESS,
  HOTEL_CREATE_FAILURE,
  HOTEL_UPDATE_REQUEST,
  HOTEL_UPDATE_SUCCESS,
  HOTEL_FIND_REQUEST,
  HOTEL_FIND_SUCCESS,
  HOTEL_FIND_FAILURE,
  // HOTEL_DELETE_REQUEST,
  // HOTEL_DELETE_SUCCESS,
  FLIGHT_CREATE_REQUEST,
  // FLIGHT_DELETE_REQUEST,
  FLIGHT_CREATE_SUCCESS,
  // Flight_DELETE_SUCCESS,
  FLIGHT_CREATE_FAILURE,
  FLIGHT_FIND_REQUEST,
  FLIGHT_UPDATE_REQUEST,
  FLIGHT_UPDATE_SUCCESS,
  FLIGHT_FIND_SUCCESS,
  FLIGHT_FIND_FAILURE,
  CARS_CREATE_REQUEST,
  CARS_CREATE_SUCCESS,
  CARS_CREATE_FAILURE,
  CARS_FIND_REQUEST,
  CARS_FIND_SUCCESS,
  CARS_FIND_FAILURE,
  PACKAGE_CREATE_REQUEST,
  PACKAGE_CREATE_SUCCESS,
  PACKAGE_FIND_REQUEST,
  PACKAGE_FIND_SUCCESS,
  PACKAGE_FIND_FAILURE,
  PACKAGE_CREATE_FAILURE,
  CARS_UPDATE_SUCCESS,
  CARS_UPDATE_REQUEST,
  PACKAGE_UPDATE_REQUEST,
  PACKAGE_UPDATE_SUCCESS,
  ADDCART_REQUEST,
  ADDCART_SUCCESS,
  ADDCART_FAILURE,
} from "../action/data";

const initialState = {
  loading: false,
  error: "",
  success: "",
  hotels: [],
};

export const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOTEL_CREATE_REQUEST:
    
    // case HOTEL_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HOTEL_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,

        success: action.payload.message,
        error: action.payload.error,
      };
 
  
    // case HOTEL_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     hotels: state.hotels.filter(
    //       (hotel) => hotel.id !== action.payload.deletedProductId
    //     ),
    //     error: null,
    //   };
    case HOTEL_CREATE_FAILURE:
    case HOTEL_FIND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const intialstateallhotel={
  loading: false,
  error: "",
  success: "",
  allhotels: [],
};

export const AllhotelReducer = (state = intialstateallhotel, action) => {
  switch (action.type) {
    case HOTEL_FIND_REQUEST:
      case HOTEL_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case HOTEL_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          allhotels: action.payload.hotel,
          success: action.payload.message,
          // error: ",
        };
      case HOTEL_FIND_SUCCESS:
        
        return {
          ...state,
          loading: false,
          allhotels: action.payload.hotel,
          success:action.payload.message
        };
        case HOTEL_FIND_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          };
        default:
          return state;
  }
};


const initialStateflight = {
  loading: false,
  error: "",
  success: "",
  flights: [],
};

export const flightReducer = (state = initialStateflight, action) => {
  switch (action.type) {
    case FLIGHT_CREATE_REQUEST:  
    // case Flight_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FLIGHT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: action.payload.error,
      };
 
  
    // case Flight_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     flights: state.flights.filter(
    //       (flight) => flight.id !== action.payload.deletedflightId
    //     ),
    //     error: null,
    //   };
    case FLIGHT_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const intialstateallflight={
  loading: false,
  error: "",
  success: "",
  allflights: [],
};

export const AllflightReducer = (state = intialstateallflight, action) => {
  switch (action.type) {
    case FLIGHT_FIND_REQUEST:
      case FLIGHT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case FLIGHT_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          allflights: action.payload.flight,
          success: action.payload.message,
          // error: ",
        };
      case FLIGHT_FIND_SUCCESS:       
        return {
          ...state,
          loading: false,
          allflights: action.payload.flight,
          success:action.payload.message
        };
        case FLIGHT_FIND_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          };
        default:
          return state;
  }
};



const initialStateCars = {
  loading: false,
  error: "",
  success: "",
  Cars:  [],
};

export const CarsReducer = (state = initialStateCars, action) => {
  switch (action.type) {
    case CARS_CREATE_REQUEST:  
    // case Flight_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CARS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: action.payload.error,
      };
 
      case CARS_FIND_REQUEST:
        case CARS_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case CARS_UPDATE_SUCCESS:
          return {
            ...state,
            loading: false,
            Cars: action.payload,
            success: action.payload.message,
            
          };
        case CARS_FIND_SUCCESS:       
          return {
            ...state,
            loading: false,
            Cars: action.payload.Rentedcars,
            success:action.payload.message
          };
          case CARS_FIND_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.message,
            };
   
    case CARS_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



const initialStatepackage = {
  loading: false,
  error: "",
  success: "",
  Package:  [],
};

export const PackageReducer = (state = initialStatepackage, action) => {
  switch (action.type) {
    case PACKAGE_CREATE_REQUEST:  
    // case Flight_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PACKAGE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: action.payload.error,
      };
 
      case PACKAGE_FIND_REQUEST:
        case PACKAGE_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case PACKAGE_UPDATE_SUCCESS:
          return {
            ...state,
            loading: false,
            Package: action.payload,
            success: action.payload.message,
            
          };
        case PACKAGE_FIND_SUCCESS:       
          return {
            ...state,
            loading: false,
            Package: action.payload.Package,
            // success:action.payload.data.message
          };
          case PACKAGE_FIND_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload.message,
            };
   
    case PACKAGE_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialStateCart = {
  loading: false,
  error: "",
  success: "",
  Carts:  [],
};

export const CartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case ADDCART_REQUEST:  
    // case Flight_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADDCART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        Carts: action.payload.carts
      };
 
  case ADDCART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};