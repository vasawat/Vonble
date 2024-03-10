import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">
          Vonble
        </Link>

        <form class="d-flex" role="search">
          <input
            id="reseachInput"
            class="form-control me-2"
            type="search"
            placeholder="ค้นหาสินค้า"
          />
          <button id="searchBtn" class="btn btn-outline-primary" type="submit">
            ค้นหา
          </button>
        </form>

        <div class="navbar-nav mb-2 mb-lg-0 gap-3">
          <div class="nav-item">Cart</div>
          <div class="nav-item">รายการโปรด</div>
          <div class="nav-item">เข้าสู้ระบบ</div>
        </div>
      </div>
    </nav>
  );
}
