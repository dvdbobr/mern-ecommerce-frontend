import Home from "./pages/home/home.component";
import ProductDetails from "./pages/productDetails/productDetails.component";

import "./App.css";
import "./components/spinner/spinner.css";
import "./pages/home/home.css";
import "./components/card/card.css";
import "./components/navbar/navbar.css";
import "./components/paginate/paginate.css";
import "./pages/productDetails/productDetails.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
