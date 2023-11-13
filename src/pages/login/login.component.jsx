import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userActions";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    dispatch(login(user.email, user.password));
  };
  useEffect(() => {
    if (userInfo) navigate(`/`);
  }, [userInfo, navigate]);
  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <h1>Login</h1>
        {loading && <Spinner />}

        <form onSubmit={loginUser}>
          <div className="loginForm">
            {error && <div className="loginError"> {error}</div>}
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Email"
              value={user.email}
              onChange={onChangeHandler}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Enter Password"
              value={user.password}
              onChange={onChangeHandler}
            />
            <div className="loginFunctions">
              <button className="addToCartBtn" type="submit">
                Login
              </button>
            </div>
            <span className="loginAndRegisterAccount">
              Don't have an account? <Link to={"/register"}>Register</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
