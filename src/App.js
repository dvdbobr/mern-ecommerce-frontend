import "./App.css";
import Home from "./pages/home/home.component";
import "./components/spinner/spinner.css";
import "./pages/home/home.css";
import "./components/card/card.css";
import "./components/navbar/navbar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
