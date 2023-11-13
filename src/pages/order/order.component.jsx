import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CheckOutBreadCrumbs from "../../components/checkoutBreadCrumbs/checkoutBreadCrumbs.component";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import { makeOrder } from "../../redux/actions/orderActions";
import {
  deleteShippingAddress,
  removeAllFromCart,
} from "../../redux/actions/cartActions";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsPrice, setItemsTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const newOrder = useSelector((state) => state.makeOrder);
  const { order, loading, error } = newOrder;
  const completeOrderHandler = () => {
    dispatch(
      makeOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: totalItemsPrice,
        taxPrice: totalTax,
        totalPrice: totalPrice,
      })
    );
    dispatch(removeAllFromCart());
    dispatch(deleteShippingAddress());
  };
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate, userInfo]);
  useEffect(() => {
    const calculateItemsTotalPrice = () => {
      setItemsTotalPrice(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    };
    const calculateTotalTax = () => {
      setTotalTax(totalItemsPrice * 0.15);
    };
    const calculateTotalPrice = () => {
      setTotalPrice(totalItemsPrice + totalItemsPrice * 0.15);
    };
    calculateItemsTotalPrice();
    calculateTotalTax();
    calculateTotalPrice();
    if (order) {
      navigate(`/order/${order._id}`);
    }
  }, [order, totalPrice, totalItemsPrice, totalTax, navigate, cartItems]);

  return (
    <>
      <Navbar />
      <CheckOutBreadCrumbs step1 step2 step3 step4 />
      <div className="orderContainer">
        <div className="orderLeft">
          <h1>Order Details:</h1>
          <br />
          <h3>SHIPPING:</h3>
          <p>Address: {shippingAddress.address}</p>
          <p>Country: {shippingAddress.country}</p>
          <p>City: {shippingAddress.city}</p>
          <p>Postal Code: {shippingAddress.postalCode}</p>
          <br />
          <hr />
          <br />
          <h3>PAYMENT METHOD:</h3>
          <p>{paymentMethod}</p>
          <br />
          <hr />
          <br />
          <h3>CART ITEMS:</h3>
          <br />
          {cartItems.length > 0 &&
            cartItems.map((cartItem, index) => {
              return (
                <React.Fragment key={index}>
                  <div map={cartItem.productID} className="cartItemsRow">
                    <span className="cartImg">
                      <img src={cartItem.url} alt="img" />
                    </span>
                    <span className="cartTitle">
                      <Link to={`/details/${cartItem.product}`}>
                        {cartItem.title}
                      </Link>
                    </span>
                    <span>Qty: {cartItem.qty}</span>
                    <span>
                      Price: ${(cartItem.price * cartItem.qty).toFixed(2)}
                    </span>
                  </div>
                  <br />
                  <hr />
                </React.Fragment>
              );
            })}
        </div>
        <div className="orderRight">
          <h1>Total Price:</h1>
          <span>Items Total: ${totalItemsPrice.toFixed(2)}</span>
          <br />
          <hr />
          <br />
          <span>Tax Total: ${totalTax.toFixed(2)}</span>
          <br />
          <hr />
          <br />
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          <br />
          <hr />
          <br />
          {loading ? <Spinner /> : error && <h2>{error}</h2>}
          <button
            className="orderBtn"
            disabled={cartItems.length === 0}
            onClick={completeOrderHandler}
          >
            Complete Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
