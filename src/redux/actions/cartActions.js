import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ALL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_DELETE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (productID, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/${productID}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data.title,
      url: data.url,
      price: data.price,
      countInStock: data.countInStock,
      product: data.productID,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productID) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productID });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeAllFromCart = () => (dispatch) => {
  dispatch({ type: CART_REMOVE_ALL, payload: [] });
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export const deleteShippingAddress = () => (dispatch) => {
  dispatch({ type: CART_DELETE_SHIPPING_ADDRESS, payload: {} });
};
