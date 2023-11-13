import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CheckOutBreadCrumbs from "../../components/checkoutBreadCrumbs/checkoutBreadCrumbs.component";
import Navbar from "../../components/navbar/navbar.component";
import { savePaymentMethod } from "../../redux/actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [paymentMethod, setPaymentMethod] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/order");
  };
  const onChangeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [navigate, userInfo]);
  return (
    <>
      <Navbar />
      <CheckOutBreadCrumbs step1 step2 step3 />
      <div className="paymentMethodContainer">
        <h3>Payment Method</h3>
        <form onSubmit={submitHandler}>
          <div className="paymentMethodForm">
            <div className="inputPayment">
              <input
                type="radio"
                name="paymentMethod"
                value={"paypal"}
                onChange={onChangeHandler}
                required
              />
              <label>Paypal</label>
            </div>
            <div className="inputPayment">
              <input
                type="radio"
                name="paymentMethod"
                value={"credit card"}
                onChange={onChangeHandler}
              />
              <label>Credit Card</label>
            </div>
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
