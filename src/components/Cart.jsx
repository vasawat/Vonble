import { useContext, useEffect } from "react";
import "./Cart.css";
import { productContext } from "../contexts/productContext";
import CartItem from "./CartItem";
import { useParams } from "react-router-dom";

export default function Cart() {
  const {
    findCart,
    userLoginedCart,
    formatMoney,
    addToCart,
    addOneInCart,
    minusOneInCart,
    removeOneItemInCart,
  } = useContext(productContext);
  const { user_id } = useParams();
  let totalAmount = 0;
  let totalCount = 0;
  userLoginedCart.length > 0 &&
    userLoginedCart.forEach((item) => {
      totalAmount += item.count * item.price;
      totalCount += item.count;
    });
  useEffect(() => {
    findCart(user_id);
    // eslint-disable-next-line
  }, [addToCart, addOneInCart, minusOneInCart, removeOneItemInCart]);
  return (
    <section className="sectionCart">
      <div className="allItem-Box">
        <div className="allCart_Box">
          <div>
            <h3 className="p-2">สินค้าในตะกร้า</h3>
            <div className="allItem_Cart">
              {userLoginedCart.length > 0 ? (
                userLoginedCart.map((product) => (
                  <CartItem
                    key={product.id}
                    productsID={product.id}
                    productCount={product.count}
                  />
                ))
              ) : (
                <div className="d-flex justify-content-center mt-5">
                  <p>ไม่มีสินค้าในตะกร้า</p>
                </div>
              )}
            </div>
          </div>
          <div className="overall_Cart">
            <div>
              <p>จํานวนสินค้าทั้งหมด {totalCount} รายการ</p>
              <p>ราคาทั้งหมด {formatMoney(totalAmount)} บาท</p>
            </div>

            <div className="overall_Cart_item_button">
              <button className="btn btn-primary">สั่งซื้อ</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
