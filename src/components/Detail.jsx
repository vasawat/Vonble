import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import testimg from "./imgs/testimg.jpg";
import { MdNavigateNext } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Detail() {
  const {
    formatMoney,
    showOverlay,
    userLogined,
    handleLoginShow,
    addToCart,
    findProductDetail,
    productDetail,
    deleteProduct,
    editProduct,
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

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const {
    register: Edit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
  } = useForm();
  const [formData, setFormData] = useState({}); // State for JSONB data
  const [fieldName, setFieldName] = useState(""); // State for field name
  const [fieldValue, setFieldValue] = useState(""); // State for field value
  const addField = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue, // Update state using spread syntax
    });
    setFieldName(""); // Clear input fields after adding
    setFieldValue("");
  };
  const removeField = (fieldName) => {
    const newFormData = { ...formData };
    delete newFormData[fieldName];
    setFormData(newFormData);
  };

  useEffect(() => {
    findProductDetail(product_id);
    // eslint-disable-next-line
  }, [product_id]);
  useEffect(() => {
    if (productDetail.id) {
      setCurrentImageProduct(productDetail.image_url);
      setSpec(Object.entries(productDetail.spec));
      setFormData(productDetail.spec);
    }
  }, [productDetail]);
  return (
    <section className="DetailSection">
      {productDetail.id && (
        <div className="allItem-Box">
          <div className="Link-Box">
            <p>
              <Link to={"/"}>หน้าเเรก</Link>
            </p>
            <p>
              <MdNavigateNext />
            </p>
            <p>
              <Link to={`/search/category/${productDetail.category_id}`}>
                {productDetail.category_name}
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
              <div className="product-img-detail-Box">
                <img
                  className="product-img-detail"
                  src={currentImageProduct}
                  alt=""
                />
              </div>
            </div>
            <div className="right-box">
              <h2>{productDetail.name}</h2>
              <Link to={`/search/brand/${productDetail.brand_id}`}>
                <p className="brand-products-detail">
                  {productDetail.brand_name}
                </p>
              </Link>

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
                {productDetail.discount !== undefined &&
                productDetail.discount !== 0 ? (
                  <s>
                    <h6>${formatMoney(parseInt(productDetail.price))}</h6>
                  </s>
                ) : null}
              </div>

              {productDetail.discount !== undefined &&
              productDetail.discount !== 0 ? (
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
              ) : null}

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
                  <button
                    onClick={() => {
                      addToCart(productDetail, quantityCount);
                      showOverlay(1000);
                      setTimeout(() => {
                        navigate(`/user/${userLogined.user_id}/cart`);
                      }, 1000);
                    }}
                    className="buy-button"
                  >
                    ซื้อสินค้า
                  </button>
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
                      addToCart(productDetail, quantityCount);
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
              </div>

              {userLogined.role === "admin" && (
                <div className="admin-button-box">
                  <button
                    onClick={() => {
                      handleShowEdit();
                    }}
                    className="edit-button"
                  >
                    แก้ไขสินค้า
                  </button>
                  <button
                    onClick={() => {
                      deleteProduct(productDetail.id);
                      navigate("/");
                    }}
                    className="delete-button"
                  >
                    ลบสินค้า
                  </button>
                  <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                      <Modal.Title>แก้ไข้ข้อมูลสินค้า</Modal.Title>
                    </Modal.Header>
                    <form>
                      <Modal.Body className="row g-3 p-3">
                        <div className="col-md-12" style={{ textAlign: "right" }}>
                          <div
                            className="btn btn-danger"
                            onClick={() => {
                              resetEdit();
                              setFormData({});
                              setFormData(productDetail.spec);
                            }}
                          >
                            คืนข้อมูลเริ่มต้น
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">ชื่อสินค้า :</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={productDetail.name}
                            {...Edit("nameEdit", { required: true })}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">ราคา :</label>
                          <input
                            type="number"
                            className="form-control"
                            min={0}
                            defaultValue={productDetail.price}
                            {...Edit("priceEdit", { required: true })}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">ส่วนลด :</label>
                          <input
                            type="number"
                            className="form-control"
                            min={0}
                            max={100}
                            defaultValue={productDetail.discount}
                            {...Edit("discountEdit")}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">จำนวน :</label>
                          <input
                            type="number"
                            className="form-control"
                            min={0}
                            defaultValue={productDetail.quantity}
                            {...Edit("quantityEdit", { required: true })}
                          />
                        </div>

                        <div className="col-md-8">
                          <label className="form-label">ลิงค์รูปภาพ :</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={productDetail.image_url}
                            {...Edit("image_urlEdit")}
                          />
                        </div>

                        <div className="col-md-2">
                          <label className="form-label">CategoryID :</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={productDetail.category_id}
                            {...Edit("category_idEdit", { required: true })}
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">BrandID :</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={productDetail.brand_id}
                            {...Edit("brand_idEdit", { required: true })}
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label">รายละเอียดสินค้า :</label>
                          <textarea
                            className="form-control"
                            defaultValue={productDetail.description}
                            {...Edit("descriptionEdit")}
                            rows="2"
                          />
                        </div>
                        {/*  */}
                        <label className="col-md-12 form-label">สเปคสินค้า</label>
                        <label className="col-md-1 form-label">ชื่อ field:</label>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setFieldName(e.target.value)}
                            value={fieldName}
                          />
                        </div>
                        <label className="col-md-1 form-label">ค่า field:</label>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setFieldValue(e.target.value)}
                            value={fieldValue}
                          />
                        </div>
                        <div className="col-md-2">
                          <div
                            className="btn btn-primary"
                            onClick={() => addField(fieldName, fieldValue)}
                          >
                            เพิ่ม field
                          </div>
                        </div>
                        <h4 className="mt-5">ตัวอย่างสเปคสินค้า</h4>
                        <table className="SpecTable">
                          <tbody>
                            {Object.keys(formData).map((fieldName) => {
                              return (
                                <tr key={fieldName}>
                                  <td>{fieldName}</td>
                                  <td>{formData[fieldName]} </td>
                                  <div
                                    className="btn btn-danger m-2"
                                    onClick={() => removeField(fieldName)}
                                  >
                                    ลบ
                                  </div>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {/*  */}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                          ปิด
                        </Button>
                        <Button
                          variant="warning"
                          type="submit"
                          className="text-white"
                          onClick={handleSubmitEdit((data) => {
                            let newData = {
                              product_id: product_id,
                              ...data,
                              spec: { ...formData },
                            };
                            editProduct(newData);
                          })}
                        >
                          แก้ไขข้อมูล
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </div>
              )}
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
