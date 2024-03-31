import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import testimg from "./imgs/testimg.jpg";
import { MdNavigateNext } from "react-icons/md";

export default function Detail() {
  const {
    formatMoney,
    userLogined,
    handleLoginShow,
    addToCart,
    findProductDetail,
    productDetail,
    deleteProduct,
  } = useContext(productContext);
  const { product_id } = useParams();
  const [Spec, setSpec] = useState({});
  const [currentImageProduct, setCurrentImageProduct] = useState();
  const [quantityCount, setQuantityCount] = useState(1);
  const navigate = useNavigate();
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
    findProductDetail(product_id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (productDetail.id) {
      setCurrentImageProduct(productDetail.image_url);
      setSpec(Object.entries(productDetail.spec));
    }
  }, [productDetail]);
  return (
    <section className="DetailSection">
      {productDetail.id && (
        <div className="allItem-Box">
          <div className="Link-Box">
            <p>
              <Link to={"/"}>Home</Link>
            </p>
            <p>
              <MdNavigateNext />
            </p>
            <p>
              <Link to={`/search/category/${productDetail.category_id}`}>
                Product
              </Link>
            </p>
            <p>
              <MdNavigateNext />
            </p>
            <p>{productDetail.name}</p>
          </div>
          <div className="product-box">
            <div className="left-box">
              <div className="img-selector-box">
                <img
                  className="img-selector"
                  onClick={(e) => {
                    setCurrentImageProduct(e.target.src);
                  }}
                  src={productDetail.image_url}
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
                  src={productDetail.image_url}
                  alt=""
                />
                <img
                  className="img-selector"
                  onClick={(e) => {
                    setCurrentImageProduct(e.target.src);
                  }}
                  src={productDetail.image_url}
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
              <h2>{productDetail.name}</h2>
              <p className="brand-products-detail">
                {productDetail.brand_name}
              </p>
              <div className="price-products-detail">
                {productDetail.discount !== undefined &&
                productDetail.discount !== 0 ? (
                  <h5 className="discount-price-products-detail">
                    -{productDetail.discount}%
                  </h5>
                ) : null}
                <h3>
                  $
                  {formatMoney(
                    parseInt(
                      Math.floor(
                        productDetail.price *
                          ((100 - productDetail.discount) / 100)
                      )
                    )
                  )}
                </h3>
                <s>
                  <h6>${formatMoney(parseInt(productDetail.price))}</h6>
                </s>
              </div>
              <p className="discount-text">
                ประหยัดทันที{" "}
                {formatMoney(
                  parseInt(
                    Math.floor(
                      productDetail.price * (productDetail.discount / 100)
                    )
                  )
                )}{" "}
                บาท
              </p>
              <div className="quantity-box">
                <div>จํานวน :</div>

                <div className="quantity-button-box">
                  <button
                    className="quantity-button"
                    onClick={() => {
                      if (quantityCount <= 1) {
                      } else {
                        setQuantityCount(quantityCount - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    className="quantity"
                    type="text"
                    value={quantityCount}
                    readOnly
                  />
                  <button
                    className="quantity-button"
                    onClick={() => setQuantityCount(quantityCount + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="buy-button-box">
                {userLogined.email ? (
                  <button className="buy-button">ซื้อสินค้า</button>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginShow();
                    }}
                    className="buy-button"
                  >
                    ซื้อสินค้า
                  </button>
                )}
                {userLogined.email ? (
                  <button
                    onClick={() => {
                      addToCart(productDetail);
                      sweetAlertAddToCart();
                    }}
                    className="incart-button"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginShow();
                    }}
                    className="incart-button"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                )}
                {userLogined.role === "admin" && (
                  <button
                    onClick={() => {
                      deleteProduct(productDetail.id);
                      navigate("/");
                    }}
                    className="delete-button"
                  >
                    ลบสินค้า
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="detail-box">
            <h3>รายละเอียดสินค้า</h3>
            <p>{productDetail.description}</p>
          </div>
          <div className="spac-box">
            <h3>สเปคสินค้า</h3>
            {Spec.length > 0 ? (
              <table>
                <tbody>
                  {Spec.map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
