import "./styles/general.css";
import "./components/spinner/spinner.css";
import "./pages/home/home.css";
import "./components/card/card.css";
import "./components/navbar/navbar.css";
import "./components/paginate/paginate.css";
import "./pages/productDetails/productDetails.css";
import "./pages/login/login.css";
import "./pages/cart/cart.css";
import "./components/checkoutBreadCrumbs/breadcrumbs.css";
import "./pages/shipment/shipment.css";
import "./pages/payment/payment.css";
import "./pages/order/order.css";
import "./pages/admin/adminProduct.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";
import ProductDetails from "./pages/productDetails/productDetails.component";
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import Cart from "./pages/cart/cart.component";
import Shipment from "./pages/shipment/shipment.component";
import Payment from "./pages/payment/payment.component";
import Order from "./pages/order/order.component";
import MyOrders from "./pages/order/myOrders.component";
import OrderDetails from "./pages/order/orderDetails.components";
import AdminProducts from "./pages/admin/adminProducts.component";
import AdminCreateProduct from "./pages/admin/adminCreateProduct.component";
import AdminEditProduct from "./pages/admin/adminEditProduct.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          element={<Home />}
        />
        <Route exact path="/page/:pageNumber" element={<Home />} />
        <Route exact path="/details/:id" element={<ProductDetails />} />
        <Route exact path="/search/:keyword" element={<Home />} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          element={<Home />}
        />
        <Route exact path="/details/:id" element={ProductDetails} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cart/:id?" element={<Cart />} />
        <Route exact path="/shipment" element={<Shipment />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/user/myorders" element={<MyOrders />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route exact path="/admin/products" element={<AdminProducts />} />
        <Route
          exact
          path="/admin/createProduct"
          element={<AdminCreateProduct />}
        />
        <Route
          exact
          path="/admin/editProduct/:id"
          element={<AdminEditProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
