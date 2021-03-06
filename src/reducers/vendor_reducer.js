import {
    REGISTER_VENDOR,
    REGISTER_VENDOR_SUCCESS,
    REGISTER_VENDOR_ERROR,
    VENDOR_DETAILS,
    VENDOR_DETAILS_ERROR,
    VENDOR_DETAILS_BEGIN,
    REQUEST_VENDOR_LOGIN,
    LOGIN_VENDOR_ERROR,
    LOGIN_VENDOR_SUCCESS,
    CHANGE_VENDOR_PASSWORD,
    VENDOR_LOGOUT,
    CREATE_PRODUCT,
    END_CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    GET_VENDOR_PRODUCTS,
    GET_VENDOR_PRODUCTS_SUCCESS,
    GET_VENDOR_PRODUCTS_ERROR,
  } from "../actions";
  
  const vendor_reducer = (state, action) => {
    if (action.type === REGISTER_VENDOR) {
      return { ...state, 
        register_vendor_loading: true,
        register_vendor_error: false, 
       // register_vendor: action.payload 
      };
    }
    if (action.type === REGISTER_VENDOR_SUCCESS) {
      return {
        ...state,
        token: action.payload.token,
        register_vendor: action.payload,
        register_vendor_loading: false,
      };
    }
    if (action.type === REGISTER_VENDOR_ERROR) {
      return { ...state,
        register_vendor_error: true,
        register_vendor_loading: false,
       };
    }
    if (action.type === REQUEST_VENDOR_LOGIN) {
      return { ...state, loading: true };
    }
    if (action.type === LOGIN_VENDOR_SUCCESS) {
      return {
        ...state,
        token: action.payload.token,
        loading: false,
      };
    }
    if (action.type === LOGIN_VENDOR_ERROR) {
      return { ...state, loading: false };
    }
    if (action.type === VENDOR_DETAILS_BEGIN) {
      return { ...state, vendor_details_loading: true, vendor_details_error: false };
    }
    if (action.type === VENDOR_DETAILS) {
      return {
        ...state,
        vendor_details_loading: false,
  
        vendorDetails: action.payload,
      };
    }
    if (action.type === VENDOR_DETAILS_ERROR) {
      return {
        ...state,
        vendor_details_loading: false,
  
        vendor_details_error: true,
      };
    }
    if (action.type === CHANGE_VENDOR_PASSWORD) {
      return { ...state, newPassword: action.payload };
    }
    if (action.type ===VENDOR_LOGOUT) {
      return { ...state, vendorLogout: true };
    }
    if (action.type === VENDOR_DETAILS) {
      return { ...state, vendorDetails: action.payload };
    }
    if (action.type === CREATE_PRODUCT) {
      return {
        ...state,
        creating_product: true,
        creating_product_message: action.payload, 
      };
    }
    if (action.type === END_CREATE_PRODUCT) {
      return {
        ...state,
        creating_product: false,
        creating_product_error: false,
        creating_product_message:''
      };
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
      console.log("error payload", action.payload)
      return {
        ...state,
        creating_product: false,
        creating_product_error: true, 
        creating_product_message: action.payload, 
      };
    }
    if (action.type === CREATE_PRODUCT_SUCCESS) {
     return {
        ...state,
        creating_product: false,
        creating_product_error: false,
        creating_product_message: action.payload.message,
        product: action.payload.data
      };
    }
    if (action.type === GET_VENDOR_PRODUCTS) {
      return {
        ...state,
        getting_products_loading: true,
        getting_products_error: false,
      };
    }
    if (action.type === GET_VENDOR_PRODUCTS_ERROR) {
      return {
        ...state,
        getting_products_loading: false,
        getting_products_error: true 
      };
    }
    if (action.type === GET_VENDOR_PRODUCTS_SUCCESS) {
     
      return {
        ...state,
        getting_products_loading: false,
        getting_products_error: false ,
        products:action.payload,
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default vendor_reducer;
  