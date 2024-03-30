import { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { productContext } from "../contexts/productContext";
import { FiDelete } from "react-icons/fi";
export default function CartItem({ productsID, productCount }) {
  const {
    products,
    addOneInCart,
    minusOneInCart,
    removeOneItemInCart,
    formatMoney,
  } = useContext(productContext);
  const [thisProduct, setThisProduct] = useState();
  const [cartQuantityCount, setCartQuantityCount] = useState(productCount);
  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === parseInt(productsID)) {
        setThisProduct(products[i]);
      }
    }
  }, [products, productsID]);
  return (
    <div className="CartItemBox">
      {thisProduct !== undefined ? (
        <div className="d-flex p-2">
          <img width={80} src={thisProduct.image_url} alt="" />
          <p>{thisProduct.name.substring(0, 20)}...</p>
          <div className="ms-auto pe-3 d-flex align-items-center">
            <div className="quantity-Cart-button-box">
              <button
                className="quantityCart-button"
                onClick={() => {
                  if (cartQuantityCount <= 1) {
                    removeOneItemInCart(productsID);
                  } else {
                    setCartQuantityCount(cartQuantityCount - 1);
                    minusOneInCart(productsID);
                  }
                }}
              >
                -
              </button>
              <input
                className="quantity"
                type="text"
                value={cartQuantityCount}
                readOnly
              />
              <button
                className="quantityCart-button"
                onClick={() => {
                  setCartQuantityCount(cartQuantityCount + 1);
                  addOneInCart(productsID);
                }}
              >
                +
              </button>
            </div>
            <p className="cartProductPrice">
              - {formatMoney(thisProduct.price * cartQuantityCount)}
            </p>
            <span
              className="ms-2"
              role="button"
              onClick={() => removeOneItemInCart(productsID)}
            >
              <FiDelete size={22} />
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
