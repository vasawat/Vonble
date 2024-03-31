import { useLocation, useParams } from "react-router-dom";
import "./SearchPage.css";
import { useContext, useEffect } from "react";
import { productContext } from "../contexts/productContext";
import CardProduct from "./HomeItem/CardProduct";

export default function SearchPage() {
  const { keywordCategorySearch } = useParams();
  const { searchCategory, searchCategoryItem } =
    useContext(productContext);
  useEffect(() => {
    searchCategory(keywordCategorySearch);
    // eslint-disable-next-line
  }, []);
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <section className="searchSection">
      <div className="allItem-Box">
        <p className="">
          Search Result{" "}
           {searchCategoryItem.length > 0 ? searchCategoryItem.length:0} item
        </p>
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
              {searchCategoryItem.length > 0 &&
                searchCategoryItem.map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
