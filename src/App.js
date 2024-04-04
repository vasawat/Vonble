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
import SearchCategoryPage from "./components/SearchCategoryPage";
import SearchBrandPage from "./components/SearchBrandPage";
import AdminPage from "./components/AdminPage";
import PaymentPage from "./components/PaymentPage";
import TransactionPage from "./components/TransactionPage";
import TransactionDetail from "./components/TransactionDetail";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Header />
        <div class="overlay"></div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/:user_email" element={<UserPage />}></Route>
          <Route
            path="/user/:user_id/transaction"
            element={<TransactionPage />}
          ></Route>
          <Route
            path="/user/:user_id/transaction/:transectionID"
            element={<TransactionDetail />}
          ></Route>
          <Route path="/user/:user_id/cart" element={<Cart />}></Route>
          <Route
            path="/product/:category_id/:product_id"
            element={<Detail />}
          ></Route>
          <Route path="/search/:keywordSearch" element={<SearchPage />}></Route>
          <Route
            path="/search/category/:keywordCategorySearch"
            element={<SearchCategoryPage />}
          ></Route>
          <Route
            path="/search/brand/:keywordBrandSearch"
            element={<SearchBrandPage />}
          ></Route>
          <Route
            path="/user/:user_id/payment/:transactionID"
            element={<PaymentPage />}
          ></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
        </Routes>
        <Footer />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
