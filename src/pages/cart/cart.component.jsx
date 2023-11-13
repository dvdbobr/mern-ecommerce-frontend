import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log(location.search);
  const productID = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    if (userInfo) navigate(`/shipment`);
    else navigate(`/login`);
  };
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty, userInfo]);
  return (
    <>
      <Navbar />
      {!cartItems ? (
        <Spinner />
      ) : (
        <div className="cartContainer">
          {cartItems.length > 0 ? (
            <>
              <div className="cartItems">
                <h1>Your Shopping Cart</h1>
                {cartItems.map((cartItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="cartItemsRow">
                        <div className="cartImg">
                          <img src={cartItem.url} alt="img" />
                        </div>
                        <div className="cartTitle">
                          <Link to={`/details/${cartItem.product}`}>
                            {cartItem.title}
                          </Link>
                        </div>
                        <div className="cartSelect">
                          <select
                            value={cartItem.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(
                                  cartItem.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(cartItem.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="cartPrice">
                          ${parseFloat(cartItem.price).toFixed(2)}
                        </div>
                        <div className="removeFromCart">
                          <button
                            onClick={() =>
                              removeFromCartHandler(cartItem.product)
                            }
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                      <hr />
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="cartTotal">
                Subtotal: ({cartItems.reduce((a, b) => a + b.qty, 0)} items): $
                {parseFloat(
                  cartItems.reduce((a, b) => a + b.qty * b.price, 0)
                ).toFixed(2)}
                {
                  <button
                    className="cartCheckout"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed To Checkout
                  </button>
                }
              </div>
            </>
          ) : (
            <div className="emptyCart">
              <h1>Cart is empty</h1>
              <Link to={`/`}>Go To Homepage</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
