import { useLocation, useParams } from "react-router-dom";
import "./SearchPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import CardProduct from "./HomeItem/CardProduct";

export default function SearchPage() {
  const { keywordSearch } = useParams();
  const { products } = useContext(productContext);
  const [filterSearch, setFilterSearch] = useState([]);
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  useEffect(() => {
    setFilterSearch(
      products.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(keywordSearch.toLowerCase())
      )
    );
  }, [keywordSearch, products]);
  return (
    <section className="searchSection">
      <div className="allItem-Box">
        <p className="">Search Result {filterSearch.length} item</p>
        <section className="filterSection">
          <div className="filterBoxContainer">
            <div className="filterBox">
            <p>ตั้งค่าการค้นหา</p>
            <div>
              <p>ช่วงราคา</p>
              <input type="range" />
            </div>
            <div>
              <p>แบรนด์</p>
              <input type="checkbox" />
              <label htmlFor="">LG</label>
            </div>
            </div>
          </div>
          <div className="productBox">
            <div className="container itembox">
              {filterSearch.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
