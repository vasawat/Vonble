import { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { productContext } from "../contexts/productContext";
export default function CartItem({ productsID }) {
  const { products } = useContext(productContext);
  const [thisProduct, setThisProduct] = useState();


  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productsID) {
        setThisProduct(products[i]);
      }
    }
  }, [products, productsID]);
  return (
    <div>
      {thisProduct !== undefined ? (
        <div className="d-flex">
          <h1>{thisProduct.id}</h1>
          <img width={80} src={thisProduct.image_url} alt="" />
          <p>{thisProduct.name}</p>
          <p>{thisProduct.price}</p>
        </div>
      ) : null}
    </div>
  );
}
