import { productContext } from "../../contexts/productContext";
import "./BestSale.css";
import CardProduct from "./CardProduct";
import React, { useContext } from "react";
export default function BestSale() {
  const { products } = useContext(productContext);
  return (
    <section className="SectionBestSaleBox">
      <div className="allItem-Box">
        <h2 className="text-center">🏆 Best Sale Top 5 🏆</h2>
        <div className="bestProductBox">
          <div className="number4">
            <div className="number text-center">4</div>
            <CardProduct product={products[3]} />
          </div>
          <div className="number2">
            <div className="number text-center">2</div>
            <CardProduct product={products[3]} />
          </div>
          <div className="number1">
            <div className="number text-center">1</div>
            <CardProduct product={products[3]} />
          </div>
          <div className="number3">
            <div className="number text-center">3</div>
            <CardProduct product={products[3]} />
          </div>
          <div className="number5">
            <div className="number text-center">5</div>
            <CardProduct product={products[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
