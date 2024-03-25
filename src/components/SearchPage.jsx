import { useParams } from "react-router-dom";
import "./SearchPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import CardProduct from "./HomeItem/CardProduct";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function SearchPage() {
  const { keywordSearch } = useParams();
  const { products } = useContext(productContext);
  const [filterSearch, setFilterSearch] = useState([]);
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
        <Row>
          {filterSearch.map((product) => (
            <Col>
              <CardProduct key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
