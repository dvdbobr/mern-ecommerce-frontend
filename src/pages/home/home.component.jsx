import React, { useEffect } from "react";
// import cookies from 'js-cookie'
import { useSelector, useDispatch } from "react-redux";
// import { listProducts } from "../../redux/actions/productAction";
import Navbar from "../../components/navbar/navbar.component";
import Spinner from "../../components/spinner/spinner.component";
import Card from "../../components/card/card.component";
// import { useParams } from "react-router";
import Paginate from "../../components/paginate/paginate.component";
import { listProducts } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page } = productList;
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const keyword = params.keyword;
  useEffect(() => {
    dispatch(listProducts(pageNumber, keyword));
  }, [dispatch, pageNumber, keyword]);
  // useEffect(() => {
  //   dispatch(allProducts());
  //   console.log(productList);
  // }, [dispatch, products, productList]);

  return (
    <>
      <Navbar />
      <div className="main">
        {loading ? (
          <Spinner />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <div className="cardContainer">
              {products ? (
                products.map((product) => {
                  return (
                    <Card
                      key={product.productID}
                      id={product.productID}
                      img={product.url}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                    />
                  );
                })
              ) : (
                <h2>No Products Found</h2>
              )}
            </div>
            <Paginate pages={pages} page={page} keyword={keyword}></Paginate>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
