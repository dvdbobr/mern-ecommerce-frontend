import React, { useEffect, useState } from "react";
//import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FcPlus } from "react-icons/fc";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import { allProducts, productDelete } from "../../redux/actions/productActions";
const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allProductsList = useSelector((state) => state.allProductsList);
  const { products, loading, error } = allProductsList;
  const deleteProducts = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleted,
  } = deleteProducts;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate } = productCreate;
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [, setLogoutConfirm] = useState(false);
  const [productID, setProductID] = useState("");
  const deleteHandler = (id) => {
    setLogoutPopup(true);
    setProductID(id);
  };
  const editHandler = (id) => {
    navigate(`/admin/editProduct/${id}`);
  };
  const confirmHandler = () => {
    setLogoutConfirm(true);
    setLogoutPopup(false);
    dispatch(productDelete(productID));
  };

  const createProductHandler = () => {
    navigate("/admin/createProduct");
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && userInfo.user.role === 1) dispatch(allProducts());
    else navigate(`/`);
  }, [dispatch, userInfo, navigate, deleted]);
  return (
    <>
      <Navbar />
      <>
        {loadingDelete ? (
          <Spinner />
        ) : errorDelete ? (
          <h1 className="selectedError">{errorDelete}</h1>
        ) : null}
        {loadingCreate ? (
          <Spinner />
        ) : errorCreate ? (
          <h1 className="selectedError">{errorCreate}</h1>
        ) : null}

        {loading ? (
          <Spinner />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div className="table-wrapper">
            <div className="adminAddProduct">
              <button onClick={createProductHandler}>
                CREATE PRODUCT <FcPlus />
              </button>
            </div>
            <table className="myOrdersTable">
              <thead>
                <tr>
                  <th>PRODUCT ID</th>
                  <th>TITLE</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                  <th colspan="2"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>
                        <Link to={`/details/${product.productID}`}>
                          {product.productID}
                        </Link>
                      </td>
                      <td style={{ width: "300px" }}>{product.title}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.countInStock}</td>
                      <td>
                        <BsTrash
                          onClick={() => deleteHandler(product.productID)}
                        />
                      </td>
                      <td>
                        <FiEdit
                          onClick={() => editHandler(product.productID)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {logoutPopup ? (
          <>
            <div className="logoutModalOverlay"></div>
            <div className="logoutModal">
              <h2>are you sure you want to delete this product?</h2>
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
      </>
    </>
  );
};

export default AdminProducts;
