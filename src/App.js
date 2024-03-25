import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/productContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import SearchPage from "./components/SearchPage";
import UserPage from "./components/UserPage";
import Cart from "./components/Cart";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/:user_id" element={<UserPage />}></Route>
          <Route path="/user/:user_id/:cart_id" element={<Cart />}></Route>
          <Route
            path="/product/:category_id/:product_id"
            element={<Detail />}
          ></Route>
          <Route path="/search/:keywordSearch" element={<SearchPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
