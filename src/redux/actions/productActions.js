import axios from "axios";
import {
  ALL_PRODUCT_LIST_FAILURE,
  ALL_PRODUCT_LIST_REQUEST,
  ALL_PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SELECTED_PRODUCT,
} from "../constants/productConstants";

export const allProducts = () => async (dispatch) => {
  dispatch({
    type: ALL_PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products`
    );
    dispatch({ type: ALL_PRODUCT_LIST_SUCCESS, payload: { data: data } });
  } catch (err) {
    dispatch({ type: ALL_PRODUCT_LIST_FAILURE, payload: err.message });
  }
};

export const listProducts =
  (page = "", keyword = "") =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/paginated?keyword=${keyword}&page=${page}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data: data } });
    } catch (err) {
      dispatch({ type: PRODUCT_LIST_FAILURE, payload: err.message });
    }
  };

export const itemDetails = (selectedItem) => (dispatch) => {
  dispatch({
    type: SELECTED_PRODUCT,
    payload: selectedItem,
  });
};

export const productDetails = (selectedProductID) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: selectedProductID });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${selectedProductID}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("selectedItem", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
