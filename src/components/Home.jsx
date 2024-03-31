import "./Home.css";
import Carousel from "./HomeItem/Carousel";
import CategoriesBox from "./HomeItem/CategoriesBox";
import BestSale from "./HomeItem/BestSale";
import EachCategoryItem from "./HomeItem/EachCategoryItem";

export default function Home() {
  return (
    <section className="HomeBox">
      <Carousel />
      <CategoriesBox />
      <BestSale />
      <EachCategoryItem categoryID={1} />
      <EachCategoryItem categoryID={3} />
      <EachCategoryItem categoryID={2} />
      <EachCategoryItem categoryID={4} />
    </section>
  );
}
