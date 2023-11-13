import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import {
  MAKE_ORDER_RESET,
  USER_ORDER_LIST_RESET,
} from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
      {
        email: email,
        password: password,
      }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        err.response && err.response.data ? err.response.data : err.response,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_ORDER_LIST_RESET });
  dispatch({ type: MAKE_ORDER_RESET });
};
