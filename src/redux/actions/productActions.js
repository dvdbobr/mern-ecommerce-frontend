import axios from "axios";
import {
  ALL_PRODUCT_LIST_FAILURE,
  ALL_PRODUCT_LIST_REQUEST,
  ALL_PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstant";

export const allProducts = () => async (dispatch) => {
  dispatch({
    type: ALL_PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products`);
    dispatch({ type: ALL_PRODUCT_LIST_SUCCESS, payload: { data: data } });
  } catch (err) {
    dispatch({ type: ALL_PRODUCT_LIST_FAILURE, payload: err.message });
  }
};
const url = "https://mern-ecommerce-backend-5w9x.onrender.com";
export const listProducts =
  (page = "", keyword = "") =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `${url}/api/products/paginated?keyword=${keyword}&page=${page}`
      );
      console.log(data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data: data } });
    } catch (err) {
      dispatch({ type: PRODUCT_LIST_FAILURE, payload: err.message });
    }
  };
