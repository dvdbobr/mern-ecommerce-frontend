import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
const CheckOutBreadCrumbs = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="breadcrumbs">
      {step1 ? (
        <Link className={step2 ? "previousBreadcrumbs" : ""} to={"/login"}>
          Login
        </Link>
      ) : (
        <Link id="disabledbBreadcrumbs" disabled>
          Login
        </Link>
      )}{" "}
      <FaLongArrowAltRight className="breadcrumbsArrow" />
      {step2 ? (
        <Link className={step3 ? "previousBreadcrumbs" : ""} to={"/shipment"}>
          Shipment
        </Link>
      ) : (
        <>
          <Link id="disabledbBreadcrumbs" disabled>
            Shipment
          </Link>{" "}
          {">"}
        </>
      )}
      <FaLongArrowAltRight className="breadcrumbsArrow" />
      {step3 ? (
        <Link className={step4 ? "previousBreadcrumbs" : ""} to={"/payment"}>
          Payment
        </Link>
      ) : (
        <Link id="disabledbBreadcrumbs" disabled>
          Payment
        </Link>
      )}
      <FaLongArrowAltRight className="breadcrumbsArrow" />
      {step4 ? (
        <Link to={"/order"}>Place Order</Link>
      ) : (
        <Link id="disabledbBreadcrumbs" disabled>
          Place Order
        </Link>
      )}
    </div>
  );
};

export default CheckOutBreadCrumbs;
