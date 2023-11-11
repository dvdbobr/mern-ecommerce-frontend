import axios from "axios";
import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
} from "../constants/orderConstants";

export const makeOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: MAKE_ORDER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/order", order, config);
    order.orderItems.forEach(async (item) => {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/updateProductStock/${item.product}`,
        {
          qty: item.qty,
        }
      );
    });
    dispatch({ type: MAKE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MAKE_ORDER_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/getOrderById/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/order/myorders`,
      config
    );
    dispatch({ type: USER_ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_ORDER_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
