import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    productID: "",
    title: "",
    category: "",
    description: "",
    price: "",
    imgUrl: "",
    countInStock: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          productID: `${newProduct.productID}`,
          title: `${newProduct.title}`,
          category: `${newProduct.category}`,
          description: `${newProduct.description}`,
          price: `${newProduct.price}`,
          url: `${newProduct.imgUrl}`,
          countInStock: `${newProduct.countInStock}`,
        },
        config
      );
      //localStorage.setItem('login', true)
      navigate("/admin/products");
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 1) navigate(`/`);
  }, [navigate, userInfo]);
  return (
    <>
      <Navbar />
      <div className="adminCreateContainer">
        <h1>Create New Product</h1>
        <form onSubmit={createProductHandler}>
          <div className="adminCreateForm">
            <input
              type="text"
              name="productID"
              required
              placeholder="Enter product ID"
              value={newProduct.productID}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="title"
              required
              placeholder="Enter title"
              value={newProduct.title}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="category"
              required
              placeholder="Enter category"
              value={newProduct.category}
              onChange={onChangeHandler}
            />
            <textarea
              placeholder="Enter description"
              name="description"
              value={newProduct.description}
              onChange={onChangeHandler}
              cols="30"
              rows="5"
            ></textarea>
            <input
              type="number"
              name="price"
              required
              placeholder="Enter price"
              value={newProduct.price}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="imgUrl"
              required
              placeholder="Enter imgUrl"
              value={newProduct.imgUrl}
              onChange={onChangeHandler}
            />
            <input
              type="number"
              name="countInStock"
              required
              placeholder="Enter count in Stock"
              value={newProduct.countInStock}
              onChange={onChangeHandler}
            />
            <div className="loginFunctions">
              <button className="addToCartBtn" type="submit">
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminCreateProduct;
