import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import { getOrderDetails } from "../../redux/actions/orderActions";

function OrderDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const myOrders = () => {
    navigate("/user/myorders");
  };
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <h1 className="orderCompleted">Order Completed</h1>
          {order && (
            <div className="orderContainer">
              <div className="orderLeft">
                <h1>Order Details:</h1>
                <br />
                <h3>SHIPPING:</h3>
                <p>Address: {order.shippingAddress.address}</p>
                <p>Country: {order.shippingAddress.country}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Postal Code: {order.shippingAddress.postalCode}</p>
                <br />
                <hr />
                <br />
                <h3>PAYMENT METHOD:</h3>
                <p>{order.paymentMethod}</p>
                <br />
                <hr />
                <br />
                <h3>CART ITEMS:</h3>
                <br />
                {order.orderItems.length > 0 &&
                  order.orderItems.map((orderItem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div map={orderItem.productID} className="cartItemsRow">
                          <span className="cartImg">
                            <img src={orderItem.url} alt="img" />
                          </span>
                          <span className="cartTitle">
                            <Link to={`/details/${orderItem.product}`}>
                              {orderItem.title}
                            </Link>
                          </span>
                          <span>Qty: {orderItem.qty}</span>
                          <span>
                            Price: $
                            {(orderItem.price * orderItem.qty).toFixed(2)}
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
                <span>Items Total: ${order.itemsPrice.toFixed(2)}</span>
                <br />
                <hr />
                <br />
                <span>Tax Total: ${order.taxPrice.toFixed(2)}</span>
                <br />
                <hr />
                <br />
                <strong>Total Price: ${order.totalPrice.toFixed(2)}</strong>
                <br />
                <hr />
                <br />
                {loading ? <Spinner /> : error && <h2>{error}</h2>}
                <button className="orderBtn" onClick={myOrders}>
                  My Orders
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default OrderDetails;
