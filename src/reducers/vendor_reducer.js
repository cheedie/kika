import {
    REGISTER_VENDOR,
    VENDOR_DETAILS,
    REQUEST_VENDOR_LOGIN,
    LOGIN_VENDOR_ERROR,
    LOGIN_VENDOR_SUCCESS,
    CHANGE_VENDOR_PASSWORD,
    VENDOR_LOGOUT,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR
  } from "../actions";
  
  const vendor_reducer = (state, action) => {
    if (action.type === REGISTER_VENDOR) {
      return { ...state, register_user: action.payload };
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
    if (action.type === CHANGE_VENDOR_PASSWORD) {
      return { ...state, newPassword: action.payload };
    }
    if (action.type ===VENDOR_LOGOUT) {
      return { ...state, userLogout: true };
    }
    if (action.type === VENDOR_DETAILS) {
      return { ...state, userDetails: action.payload };
    }
    if (action.type === CREATE_PRODUCT) {
      return {
        ...state,
        product: action.payload
      };
    }
    if (action.type === CREATE_PRODUCT_ERROR) {
      return {
        ...state,
        create_product_loading: false,
        create_product_error: true 
      };
    }
    if (action.type === CREATE_PRODUCT_SUCCESS) {
      return {
        ...state,
        create_product_loading: false,
        create_product: action.payload 
      };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
  };
  
  export default vendor_reducer;
  