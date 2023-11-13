import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar.component";
import CheckOutBreadCrumbs from "../../components/checkoutBreadCrumbs/checkoutBreadCrumbs.component";
import { saveShippingAddress } from "../../redux/actions/cartActions";

const Shipment = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [user, setUser] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...user }));
    navigate("/payment");
  };
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate, userInfo]);
  return (
    <>
      <Navbar />
      <CheckOutBreadCrumbs step1 step2 />
      <div className="loginContainer">
        <form onSubmit={submitHandler}>
          <div className="shipmentForm">
            <label>
              Address:
              <input
                type="text"
                name="address"
                required
                placeholder="Enter Address"
                value={user.address}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                required
                placeholder="Enter City"
                value={user.city}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              Postal Code:
              <input
                type="number"
                name="postalCode"
                required
                placeholder="Enter Postal Code"
                value={user.postalCode}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                required
                placeholder="Enter Country"
                value={user.country}
                onChange={onChangeHandler}
              />
            </label>
            <div className="loginFunctions">
              <button className="addToCartBtn" type="submit">
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Shipment;
