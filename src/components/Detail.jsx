import { useLocation, useParams } from "react-router-dom";
import "./Detail.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import Swal from "sweetalert2";
import testimg from "./imgs/testimg.jpg";

export default function Detail() {
  const { products, Brands, formatMoney, userLogined, handleShow, addToCart } =
    useContext(productContext);
  const { product_id } = useParams();
  const [thisProduct, setThisProduct] = useState({});
  const [thisProductBrand, setThisProductBrand] = useState({});
  const [Spec, setSpec] = useState({});
  const [currentImageProduct, setCurrentImageProduct] = useState();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sweetAlertAddToCart = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Added to cart",
    });
  };

  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === parseInt(product_id)) {
        setThisProduct(products[i]);
        setSpec(Object.entries(products[i].spec));
      }
    }
  }, [products, product_id]);
  useEffect(() => {
    for (let i = 0; i < Brands.length; i++) {
      if (Brands[i].id === thisProduct.brand_id) {
        setThisProductBrand(Brands[i]);
      }
    }
    setCurrentImageProduct(thisProduct.image_url);
  }, [thisProduct, Brands]);
  return (
    <section className="DetailSection">
      <div className="allItem-Box">
        <div className="product-box">
          <div className="left-box">
            <div className="img-selector-box">
              <img
                className="img-selector"
                onClick={(e) => {
                  setCurrentImageProduct(e.target.src);
                }}
                src={thisProduct.image_url}
                alt=""
              />
              <img
                className="img-selector"
                onClick={(e) => {
                  setCurrentImageProduct(e.target.src);
                }}
                src={testimg}
                alt=""
              />
              <img
                className="img-selector"
                onClick={(e) => {
                  setCurrentImageProduct(e.target.src);
                }}
                src={thisProduct.image_url}
                alt=""
              />
              <img
                className="img-selector"
                onClick={(e) => {
                  setCurrentImageProduct(e.target.src);
                }}
                src={thisProduct.image_url}
                alt=""
              />
            </div>
            <img
              className="product-img-detail"
              src={currentImageProduct}
              alt=""
            />
          </div>
          <div className="right-box">
            <h2>{thisProduct.name}</h2>
            <p className="brand-products-detail">{thisProductBrand.name}</p>
            {/* chack format function */}
            <div className="price-products-detail">
              {thisProduct.discount !== undefined &&
              thisProduct.discount !== 0 ? (
                <h5 className="discount-price-products-detail">
                  -{thisProduct.discount}%
                </h5>
              ) : null}
              <h3>
                $
                {formatMoney(
                  parseInt(
                    Math.floor(
                      thisProduct.price * ((100 - thisProduct.discount) / 100)
                    )
                  )
                )}
              </h3>
              <s>
                <h6>${formatMoney(parseInt(thisProduct.price))}</h6>
              </s>
            </div>
            <p className="discount-text">
              ประหยัดทันที{" "}
              {formatMoney(
                parseInt(
                  Math.floor(thisProduct.price * (thisProduct.discount / 100))
                )
              )}{" "}
              บาท
            </p>
            <div className="quantity-box">
              <div>จํานวน :</div>

              <div className="quantity-button-box">
                <button className="quantity-button">-</button>
                <input
                  className="quantity"
                  type="text"
                  min="1"
                  defaultValue="1"
                />
                <button className="quantity-button">+</button>
              </div>
            </div>
            <div className="buy-button-box">
              {userLogined.email ? (
                <button className="buy-button">ซื้อสินค้า</button>
              ) : (
                <button
                  onClick={() => {
                    handleShow();
                  }}
                  className="buy-button"
                >
                  ซื้อสินค้า
                </button>
              )}
              {userLogined.email ? (
                <button
                  onClick={() => {
                    addToCart(thisProduct);
                    sweetAlertAddToCart();
                  }}
                  className="incart-button"
                >
                  เพิ่มลงตะกร้า
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleShow();
                  }}
                  className="incart-button"
                >
                  เพิ่มลงตะกร้า
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="detail-box">
          <h3>รายละเอียดสินค้า</h3>
          <p>{thisProduct.description}</p>
        </div>
        <div className="spac-box">
          <h3>สเปคสินค้า</h3>
          {Spec.length > 0 ? (
            <table>
              {Spec.map(([key, value]) => (
                <tr>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </table>
          ) : null}
        </div>
      </div>
    </section>
  );
}
