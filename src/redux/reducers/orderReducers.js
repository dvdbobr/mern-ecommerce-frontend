import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_RESET,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAILURE,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAILURE,
  USER_ORDER_LIST_RESET,
} from "../constants/orderConstants";

export const makeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST:
      return { loading: true };
    case MAKE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case MAKE_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    case MAKE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { loading: true };
    case USER_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case USER_ORDER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case USER_ORDER_LIST_RESET:
      return { ...state };
    default:
      return state;
  }
};
