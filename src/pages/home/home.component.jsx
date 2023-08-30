import React, { useEffect, useState } from "react";
// import cookies from 'js-cookie'
// import { useSelector, useDispatch } from "react-redux";
// import { listProducts } from "../../redux/actions/productAction";
import Navbar from "../../components/navbar/navbar.component";
// import Card from "../../components/card/card.component";
import Spinner from "../../components/spinner/spinner.component";
// import { useParams } from "react-router";
// import Paginate from "../../components/paginate/paginate.component";

function Home() {
  //   const dispatch = useDispatch();
  //   const productList = useSelector((state) => state.productsList);
  //   const { loading, error, products, pages, page } = productList;
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;
  //   const params = useParams();
  //   const pageNumber = params.pageNumber || 1;
  //   const keyword = params.keyword;
  //   useEffect(() => {
  // const cookie = cookies.get('ut')
  // if (cookie)
  //     console.log(cookie);
  //     dispatch(listProducts(pageNumber, keyword));
  //   }, [dispatch, userInfo, pageNumber, keyword]);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Navbar />
      <div className="main">
        {loading ? (
          <Spinner />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <></>
          //   <>
          //     <div className="cardContainer">
          //       {products
          //         ? products.map((product) => {
          //             return (
          //               <Card
          //                 id={product.productID}
          //                 img={product.url}
          //                 title={product.title}
          //                 description={product.description}
          //                 price={product.price}
          //               />
          //             );
          //           })
          //         : ""}
          //     </div>
          //     <Paginate pages={pages} page={page} keyword={keyword}></Paginate>
          //   </>
        )}
      </div>
    </>
  );
}

export default Home;
