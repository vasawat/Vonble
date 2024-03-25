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
      <EachCategoryItem thiscategory={1} />
      <EachCategoryItem thiscategory={3} />
      <EachCategoryItem thiscategory={2} />
      <EachCategoryItem thiscategory={4} />
    </section>
  );
}
