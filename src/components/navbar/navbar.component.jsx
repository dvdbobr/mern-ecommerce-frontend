import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
// import {
//   deleteShippingAddress,
//   removeAllFromCart,
// } from "../../redux/actions/cartAction";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuHandler, setMenuHandler] = useState(true);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [, setLogoutConfirm] = useState(false);
  const [keyword, setKeyword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //   const cart = useSelector((state) => state.cart);
  //   const { cartItems } = cart;
  const changeMenuHandler = () => {
    setMenuHandler(!menuHandler);
  };
  const confirmHandler = () => {
    setLogoutConfirm(true);
    setLogoutPopup(false);
    dispatch(logout());
    // dispatch(removeAllFromCart());
    // dispatch(deleteShippingAddress());
    navigate("/");
  };
  const logoutHandler = () => {
    setLogoutPopup(true);
  };
  const searchHandler = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="hamburgerMenu" onClick={changeMenuHandler}>
          {menuHandler ? (
            <GiHamburgerMenu size={33} color={"#D84D4D"} />
          ) : (
            <FaTimes size={33} color={"#D84D4D"} />
          )}
        </div>
        <div
          className={`sideMenu ${
            menuHandler ? "closeSideMenu hidden" : "openSideMenu"
          }`}
        >
          <ul>
            <li>
              USER
              <ul>
                {userInfo && userInfo.user.role === 1 && (
                  <>
                    <li>
                      <Link to={"/admin/products"}>Products</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to={"/user/myorders"}>My Orders</Link>
                </li>
                <li>
                  <Link to={"#"} onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
          </ul>
        </div>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="searchInput">
          <input
            type="text"
            value={keyword}
            name={keyword}
            onChange={searchHandler}
            placeholder="search for an item"
          />
          {keyword && (
            <Link to={`/search/${keyword}`}>
              <FcSearch />
            </Link>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <div>
          <Link to={"/"}>Home</Link>{" "}
        </div>
        <>
          {userInfo ? (
            <div className="navbarLogin">
              <Link to={"/"}>{userInfo.user.firstName}</Link>
              <div className="logoutArrow">
                <TiArrowSortedDown size={23} color={"black"} />
              </div>
              <div className="loggedIn">
                <ul>
                  {userInfo.user.role === 1 && (
                    <>
                      <li>
                        <Link to={"/admin/products"}>Products</Link>
                      </li>{" "}
                      <hr />
                    </>
                  )}
                  <li>
                    <Link to={"/user/myorders"}>My Orders</Link>
                  </li>
                  <hr />
                  <li>
                    <Link to={"#"} onClick={logoutHandler}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>Login</Link>
            </div>
          )}
        </>
        <div className="navbarCart">
          <Link to={"/cart"}>
            <FaShoppingCart />{" "}
          </Link>
          <span className="cartCounter">
            {/* {cartItems ? cartItems.length : 0} */}
          </span>
        </div>
        {logoutPopup ? (
          <>
            <div className="logoutModalOverlay"></div>
            <div className="logoutModal">
              <h2>
                If you logout your cart will not be saved, are you sure you want
                to logout?
              </h2>
              <button
                className="logoutCancelBtn"
                onClick={() => setLogoutPopup(false)}
              >
                Cancel
              </button>
              <button className="logoutConfirmBtn" onClick={confirmHandler}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
