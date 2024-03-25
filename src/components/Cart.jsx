import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { productContext } from "../contexts/productContext";
import CartItem from "./CartItem";

export default function Cart(params) {
  const { userLogined, allCart, fetchCart } = useContext(productContext);
  const [thisCartProduct, setThisCartProduct] = useState();

  function getProduct() {
    const userCart = allCart.find(
      (cart) => cart.user_id === userLogined.user_id
    );
    if (userCart) {
      setThisCartProduct(userCart.product_id_array);
    } else {
      console.log("don't have usercart");
    }
  }

  useEffect(() => {
    getProduct();
    fetchCart();
      // eslint-disable-next-line
  }, [allCart, userLogined]);
  return (
    <section>
      {thisCartProduct &&
        thisCartProduct.map((productID) => <CartItem productsID={productID} />)}
    </section>
  );
}
