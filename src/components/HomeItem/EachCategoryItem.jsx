import { useContext, useEffect, useState } from "react";
import { productContext } from "../../contexts/productContext";
import "./EachCategoryItem.css";
import Carousel from "react-bootstrap/Carousel";
import CardProduct from "./CardProduct";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EachCategoryItem({ categoryID }) {
  const { products, categories } =
    useContext(productContext);
  const [thisCategortItem, setThisCategortItem] = useState([{}]);
  const [category, setCategory] = useState([{}]);
useEffect(() => {
  const thisproduct = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].category_id === categoryID) {
      thisproduct.push(products[i]);
    }
  }
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === categoryID) {
      setCategory(categories[i]);
    }
  }
  setThisCategortItem(thisproduct);
}, [products, categories, categoryID]);
  return (
    <section className="SectionCategoryBox">
      <div className="allItem-Box">
        <div className="allItem-SectionCategoryBox">
          <div className="top-box">
            <p className="category-name">{category.name}</p>
            <Link to={`/search/category/${categoryID}`}>
            <p className="button-seeAll">
              <div>ดูทั้งหมด</div>
              <FaArrowRight />
            </p>
            </Link>
          </div>
          <div className="bottom-box">
            <Carousel
              nextIcon={
                <MdNavigateNext className="iconNext-carousel icon-box-size" />
              }
              prevIcon={
                <MdNavigateBefore className="iconPrevious-carousel icon-box-size" />
              }
            >
              <Carousel.Item className="carousel-box-category">
                <div className="carousel-item-category">
                  <CardProduct product={thisCategortItem[0]} />
                  <CardProduct product={thisCategortItem[1]} />
                  <CardProduct product={thisCategortItem[2]} />
                  <CardProduct product={thisCategortItem[3]} />
                  <CardProduct product={thisCategortItem[2]} />
                  <CardProduct product={thisCategortItem[1]} />
                </div>
              </Carousel.Item>
              <Carousel.Item className="carousel-box-category">
                <div className="carousel-item-category">
                  <CardProduct product={thisCategortItem[2]} />
                  <CardProduct product={thisCategortItem[1]} />
                  <CardProduct product={thisCategortItem[3]} />
                  <CardProduct product={thisCategortItem[2]} />
                  <CardProduct product={thisCategortItem[0]} />
                  <CardProduct product={thisCategortItem[1]} />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
