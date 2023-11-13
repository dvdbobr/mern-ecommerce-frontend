import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allProductsListReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { userLoginReducer } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  makeOrderReducer,
  orderDetailsReducer,
  userOrdersReducer,
} from "./reducers/orderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";
// const selectedItemFromStorage = localStorage.getItem("selectedItem")
//   ? JSON.parse(localStorage.getItem("selectedItem"))
//   : "";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  // selectedItem: selectedItemFromStorage,
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  allProductsList: allProductsListReducer,
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  deleteProduct: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  makeOrder: makeOrderReducer,
  orderDetails: orderDetailsReducer,
  userOrders: userOrdersReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
