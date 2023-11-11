import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar.component";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  listProducts,
  productDetails,
} from "../../redux/actions/productActions";
import Card from "../../components/card/card.component";
import Spinner from "../../components/spinner/spinner.component";
import axios from "axios";
const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productID = params.id;
  const [qty, setQty] = useState(1);
  const productInfo = useSelector((state) => state.productDetails);
  const { loadingSelected, errorSelected, selectedProduct } = productInfo;
  const productList = useSelector((state) => state.productsList);
  const { loading, error } = productList;
  const [allproducts, setAllProducts] = useState([]);
  const addToCartHandler = () => {
    navigate(`/cart/${productID}?qty=${qty}`);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`
      );
      setAllProducts(result.data);
    };
    getAllProducts();
    dispatch(listProducts());
    dispatch(productDetails(productID));
  }, [dispatch, productID]);
  return (
    <>
      <Navbar />
      {
        <div className="detailsContainer">
          {loadingSelected ? (
            <Spinner />
          ) : errorSelected ? (
            <h1 className="selectedError">{errorSelected}</h1>
          ) : (
            <div className="productDetailContainer">
              <div className="productDetailInnerContainer">
                <img src={selectedProduct.url} alt="" />
                <div className="productDetails">
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <span>
                    Price: ${parseFloat(selectedProduct.price).toFixed(2)}
                  </span>
                  {/* <button className="buyBtn">Buy</button> */}
                </div>
                <div className="productDetailsCart">
                  <table>
                    <tbody>
                      <tr>
                        <td>Price:</td>
                        <td>${parseFloat(selectedProduct.price).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Status:</td>
                        <td>
                          {selectedProduct.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </td>
                      </tr>
                      {selectedProduct.countInStock > 0 && (
                        <tr>
                          <td>Qty:</td>
                          <td>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              id=""
                            >
                              {[
                                ...Array(selectedProduct.countInStock).keys(),
                              ].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <button className="addToCartBtn" onClick={addToCartHandler}>
                    Add To Cart
                  </button>
                  {/* <div className="productDetailsCartRow">Price: <span>{selectedProduct.price}</span></div> */}
                  {/* {
                                            selectedProduct.countInStock > 0 ? (
                                                <>
                                                    <div className="productDetailsCartRow">
                                                        Status: <span className="success">
                                                            In Stock
                                                        </span>
                                                    </div>

                                                </>
                                            ) :
                                                <span className="danger">Out Of Stock</span>
                                        } */}
                </div>
              </div>
            </div>
          )}
          {!errorSelected ? (
            loading ? (
              <Spinner />
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              allproducts && (
                <>
                  <h1 className="relatedTitle">Related items</h1>
                  <div className="cardContainer">
                    {allproducts
                      .filter((p) => {
                        return p.productID !== selectedProduct.productID;
                      })
                      .map((product) => {
                        return product.category === selectedProduct.category ? (
                          <Card
                            key={product.productID}
                            id={product.productID}
                            img={product.url}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                          />
                        ) : null;
                      })}
                  </div>
                </>
              )
            )
          ) : null}
        </div>
      }
    </>
  );
};

export default ProductDetails;
