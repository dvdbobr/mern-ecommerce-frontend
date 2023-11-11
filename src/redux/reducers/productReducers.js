import {
  ALL_PRODUCT_LIST_FAILURE,
  ALL_PRODUCT_LIST_REQUEST,
  ALL_PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

const initialState = {
  products: [],
  loading: false,
  error: false,
};
const productInitialState = {
  loadingSelected: false,
  errorSelected: false,
  selectedProduct: {},
};
export const allProductsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case ALL_PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload.data };
    case ALL_PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.data.products,
        pages: action.payload.data.pages,
        page: action.payload.data.page,
      };
    case PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loadingSelected: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loadingSelected: false,
        selectedProduct: action.payload,
      };
    case PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loadingSelected: false,
        errorSelected: "no such product",
      };
    case PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
