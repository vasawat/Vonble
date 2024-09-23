import { useLocation, useParams } from "react-router-dom";
import "./SearchPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import CardProduct from "./HomeItem/CardProduct";

export default function SearchPage() {
  const { keywordSearch } = useParams();
  const { brands, searchProduct, searchProductData } =
    useContext(productContext);
  const { pathname } = useLocation();
  const [filterSearch, setFilterSearch] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [firstMaxPrice, setFirstMaxPrice] = useState(0);
  const [brandFilter, setBrandFilter] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    searchProductData(keywordSearch);
    // eslint-disable-next-line
  }, [keywordSearch]);
  useEffect(() => {
    if (searchProduct.length === 0) {
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      const sortedProducts = searchProduct.sort((a, b) => b.price - a.price);
      const highestPriceProduct = sortedProducts[0].price;
      setFirstMaxPrice(highestPriceProduct);
      setMaxPrice(highestPriceProduct);
    }
  }, [searchProduct]);
  useEffect(() => {
    if (brandFilter.length > 0) {
      setFilterSearch(
        searchProduct.filter(
          (item) =>
            item.price >= minPrice &&
            item.price <= maxPrice &&
            item.quantity > 0 &&
            brandFilter.includes(item._id)
        )
      );
    } else {
      setFilterSearch(
        searchProduct.filter(
          (item) =>
            item.price >= minPrice &&
            item.price <= maxPrice &&
            item.quantity > 0
        )
      );
    }
  }, [searchProduct, minPrice, maxPrice, brandFilter]);

  return (
    <section className="searchSection">
      <div className="allItem-Box">
        <section className="filterSection">
          <div className="filterBoxContainer">
            <div className="filterBox">
              <p>ตั้งค่าการค้นหา</p>
              <div className="priceRangeBox">
                <p>ช่วงราคา</p>
                <div className="d-flex">
                  <div className="d-grid justify-content-center">
                    <span>{minPrice}</span>
                    <input
                      type="range"
                      min={0}
                      max={firstMaxPrice}
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="d-grid justify-content-center">
                    <span>{maxPrice}</span>
                    <input
                      type="range"
                      min={0}
                      max={firstMaxPrice}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <div className="brandBox">
                <p>แบรนด์</p>
                {brands.map((brand) => (
                  <div className="brandCheck_Box" key={brand._id}>
                    <input
                      className="brandCheck_input"
                      type="checkbox"
                      id={brand._id}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setBrandFilter([...brandFilter, brand._id]);
                        } else {
                          const updatedBrandFilter = brandFilter.filter(
                            (id) => id !== brand._id
                          );
                          setBrandFilter(updatedBrandFilter);
                        }
                      }}
                    />
                    <label className="brandCheck_label" htmlFor={brand.id}>
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="productBox">
            <div className="p-2">
              ผลการค้นหา "{keywordSearch}" ({filterSearch.length} รายการ)
            </div>
            <div className="container Searchitembox">
              {filterSearch && filterSearch.length > 0 ? (
                filterSearch.map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))
              ) : (
                <div className="noItemBox">
                  <p>ไม่พบสินค้าที่ค้นหา</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
