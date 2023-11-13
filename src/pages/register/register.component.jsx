import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.component";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        {
          firstName: `${user.firstName}`,
          lastName: `${user.lastName}`,
          email: `${user.email}`,
          password: `${user.password}`,
        }
      );
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <h1>Register</h1>
        <form onSubmit={Register}>
          <div className="loginForm">
            <input
              type="text"
              name="firstName"
              required
              placeholder="Enter First Name"
              value={user.firstName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              required
              placeholder="Enter Last Name"
              value={user.lastName}
              onChange={onChangeHandler}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Email"
              value={user.email}
              onChange={onChangeHandler}
            />
            <div className="password">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                required
                placeholder="Enter Password"
                value={user.password}
                onChange={onChangeHandler}
              />
              <span>
                {passwordShown ? (
                  <AiOutlineEyeInvisible onClick={togglePasswordVisiblity} />
                ) : (
                  <AiOutlineEye onClick={togglePasswordVisiblity} />
                )}
              </span>
            </div>
            <div className="loginFunctions">
              <button className="addToCartBtn" type="submit">
                Register
              </button>
            </div>
            <span className="loginAndRegisterAccount">
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
