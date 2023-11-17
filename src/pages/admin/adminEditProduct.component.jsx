import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import { PRODUCT_UPDATE_RESET } from "../../redux/constants/productConstants";
import {
  productDetails,
  productUpdate,
} from "../../redux/actions/productActions";

const AdminEditProduct = () => {
  const params = useParams();
  const pID = params.id;
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productInfo = useSelector((state) => state.productDetails);
  const { loadingSelected, errorSelected, selectedProduct } = productInfo;
  const productUpdated = useSelector((state) => state.productUpdate);
  const { success } = productUpdated;
  const [productID, setProductID] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const goBack = () => {
    naviagate("/admin/products");
  };
  const editProductHandler = async (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
        productID: pID,
        title,
        category,
        description,
        price,
        url,
        countInStock,
      })
    );
    window.location.href = "/admin/products";
  };
  useEffect(() => {
    if (!userInfo || userInfo.user.role !== 1) naviagate(`/`);
    else if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      // naviagate('/admin/products')
    } else {
      if (!selectedProduct.title || selectedProduct.productID !== pID)
        dispatch(productDetails(pID));
      else {
        setProductID(selectedProduct.productID);
        setTitle(selectedProduct.title);
        setCategory(selectedProduct.category);
        setDescription(selectedProduct.description);
        setPrice(selectedProduct.price);
        setUrl(selectedProduct.url);
        setCountInStock(selectedProduct.countInStock);
      }
    }
  }, [dispatch, naviagate, pID, selectedProduct, success, userInfo]);
  return (
    <>
      <Navbar />
      {loadingSelected ? (
        <Spinner />
      ) : errorSelected ? (
        <h1>{errorSelected}</h1>
      ) : (
        <div className="adminCreateContainer">
          <h1>Edit Product</h1>
          <button className="adminEditGoBack" onClick={goBack}>
            Go Back
          </button>
          <form onSubmit={editProductHandler}>
            <div className="adminCreateForm">
              <input
                type="text"
                name="productID"
                required
                onChange={(e) => setProductID(e.target.value)}
                value={productID}
              />
              <input
                type="text"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <input
                type="text"
                name="category"
                required
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
              <input
                type="number"
                name="price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <input
                type="text"
                name="imgUrl"
                required
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
              <input
                type="number"
                name="countInStock"
                required
                onChange={(e) => setCountInStock(e.target.value)}
                value={countInStock}
              />
              <div className="loginFunctions">
                <button className="addToCartBtn" type="submit">
                  Edit Product
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminEditProduct;
