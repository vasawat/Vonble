import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { productContext } from "../contexts/productContext";
import CartItem from "./CartItem";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiMapPin } from "react-icons/fi";
import { RiCoupon2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import kplus from "./imgs/kplus.jpg";

export default function Cart() {
  const {
    findCart,
    userLoginedCart,
    formatMoney,
    CreateShippingAddresss,
    findUserAddress,
    userLoginedAddress,
    CreateTransaction,
    userLoginedCartID,
    showOverlay,
    deleteAddress,
  } = useContext(productContext);
  const { user_id } = useParams();
  const [buyStep, setBuyStep] = useState(1);
  const [addressId, setAddressId] = useState(null);
  const [selectAddress, setSelectAddress] = useState(undefined);
  const [noAddress, setNoAddress] = useState(false);
  const [noItemInCart, setNoItemInCart] = useState(false);
  function brotherStep() {
    setBuyStep(buyStep + 1);
  }
  function sisterStep() {
    setBuyStep(buyStep - 1);
  }

  const {
    register: address,
    handleSubmit: handleSubmitaddress,
    reset: resetaddress,
  } = useForm();
  const {
    register: payment,
    handleSubmit: handleSubmitpayment,
    // reset: resetpayment,
    formState: { errors: errorspayment },
  } = useForm();
  const {
    register: addressID,
    handleSubmit: handleSubmitaddressID,
    // reset: resetaddressID,
  } = useForm();

  let totalAmount = 0;
  let totalCount = 0;
  userLoginedCart.length > 0 &&
    userLoginedCart.forEach((item) => {
      totalAmount += item.count * item.price;
      totalCount += item.count;
    });
  useEffect(() => {
    setSelectAddress(
      userLoginedAddress.find(
        (item) => parseInt(item.address_id) === parseInt(addressId)
      )
    );
    // eslint-disable-next-line
  }, [addressId]);
  useEffect(() => {
    findCart(user_id);
    setBuyStep(1);
    findUserAddress(user_id);
    setSelectAddress(
      userLoginedAddress.find((item) => item.address_id === addressId)
    );
    // eslint-disable-next-line
  }, []);
  return (
    <section className="sectionCart">
      <div className="allItem-Box">
        <div className="allCart_Box">
          <div className="allCart_left">
            <h3 className="p-2">จัดการคำสั่งซื้อ</h3>
            <div className="stepBox">
              <div
                className={`stepButton step ${
                  buyStep === 1 ? "activeButton" : ""
                }`}
              >
                สินค้าในตะกร้า
              </div>
              <div
                className={`stepButton step ${
                  buyStep === 2 ? "activeButton" : ""
                }`}
              >
                ที่อยู่ในการจัดส่ง
              </div>
              <div
                className={`stepButton step ${
                  buyStep === 3 ? "activeButton" : ""
                }`}
              >
                ชําระเงิน
              </div>
            </div>

            {buyStep === 1 && (
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
                    <p className={noItemInCart ? "text-danger" : ""}>
                      ไม่มีสินค้าในตะกร้า
                    </p>
                  </div>
                )}
              </div>
            )}
            {buyStep === 2 && (
              <div className="allItem_Cart">
                <form
                  onSubmit={handleSubmitaddress((data) => {
                    let newDataShipping = {
                      user_id: user_id,
                      ...data,
                    };
                    CreateShippingAddresss(newDataShipping);
                    resetaddress();
                    findUserAddress(user_id);
                    // resetaddress();
                  })}
                  className="row g-3"
                >
                  <form>
                    {userLoginedAddress.length > 0 &&
                      userLoginedAddress.map((eachAddress, index) => (
                        <div key={eachAddress.address_id} className="col-md-12">
                          <div className="userAddressBox">
                            <input
                              type="radio"
                              value={eachAddress.address_id}
                              {...addressID("address_id")}
                              defaultChecked={index === 0}
                            />
                            <div>
                              <header className="userAddressBoxHead">
                                <FiMapPin size={20} />
                                <span>{eachAddress.name}</span>
                                <span>{eachAddress.phone_number}</span>
                              </header>
                              <div className="userAddressBoxContent">
                                <span>{eachAddress.address}</span>/
                                <span>{eachAddress.subdistrict}</span>/
                                <span>{eachAddress.district}</span>/
                                <span>{eachAddress.province}</span>/
                                <span>{eachAddress.postal_code}</span>
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-center trash"
                              onClick={() => {
                                deleteAddress(eachAddress.address_id);
                              }}
                            >
                              <FaRegTrashAlt size={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </form>
                  <div className="col-md-12">
                    <h4 className={noAddress ? "text-danger" : ""}>
                      สร้างที่อยู่ในการจัดส่งใหม่
                    </h4>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">ชื่อผู้รับสินค้า :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("name", { required: true })}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">ที่อยู่ในการจัดส่ง :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("address", { required: true })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">ตำบล :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("subdistrict", { required: true })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">อำเภอ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("district", { required: true })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">จังหวัด :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("province", { required: true })}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">รหัสไปรษณีย์ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("postal_code", { required: true })}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">เบอร์ติดต่อ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...address("phone_number", { required: true })}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      เพิ่มที่อยู่
                    </button>
                  </div>
                </form>
              </div>
            )}
            {buyStep === 3 && (
              <div className="allItem_Cart">
                {selectAddress && (
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="userAddressShowBox">
                        <header className="userAddressBoxHead">
                          <FiMapPin size={20} />
                          <span>{selectAddress.name}</span>
                          <span>{selectAddress.phone_number}</span>
                        </header>
                        <div className="userAddressBoxContent">
                          <span>{selectAddress.address}</span>/
                          <span>{selectAddress.subdistrict}</span>/
                          <span>{selectAddress.district}</span>/
                          <span>{selectAddress.province}</span>/
                          <span>{selectAddress.postal_code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">วิธีชำระเงิน :</label>
                    {errorspayment.payment_method && (
                      <span className="text-danger ms-2">
                        *กรุณาเลือกวิธีชำระเงิน
                      </span>
                    )}
                  </div>
                  <div className="col-md-12">
                    <label className="BankLabel">
                      <input
                        {...payment("payment_method", { required: true })}
                        type="radio"
                        value="promptpay"
                      />
                      <img
                        className="imgBank"
                        src="https://www.bot.or.th/content/dam/bot/icons/icon-thaiqr.png"
                        alt=""
                      />
                      PromptPay
                    </label>
                    <label className="BankLabel">
                      <input
                        {...payment("payment_method", { required: true })}
                        type="radio"
                        value="kplus"
                      />
                      <img className="imgBank" src={kplus} alt="" />
                      Kplus
                    </label>
                    <label className="BankLabel">
                      <input
                        {...payment("payment_method", { required: true })}
                        type="radio"
                        value="cashondelivery"
                      />
                      <span className="ms-2">เก็บเงินปลายทาง</span>
                    </label>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="allCart_right">
            <div className="overall_Cart">
              <div className="overall_Cart_top">
                <h4 className="mb-3">สรุปคำสั่งซื้อ</h4>
                <h5 className="mb-3">จํานวนสินค้า {totalCount} ชิ้น</h5>

                {buyStep > 1 &&
                  userLoginedCart.length > 0 &&
                  userLoginedCart.map((product) => (
                    <div className="overall_Item_product_Box">
                      <img
                        className="overall_Item_product_1"
                        src={product.image_url}
                        alt=""
                      />
                      <div className="overall_Item_product_2">
                      <span >
                        {product.name.slice(0, 20)}...
                      </span>
                      <span>จำนวน {product.count}</span>
                      </div>

                      <span className="overall_Item_product_3">
                        ฿{formatMoney(product.price*product.count)}
                      </span>
                    </div>
                  ))}

                <div className="overall_Item_Box">
                  <span className="overall_Item_1">ราคาสินค้า</span>
                  <span className="overall_Item_2">
                    ฿{formatMoney(totalAmount)}
                  </span>
                  <span className="overall_Item_3">บาท</span>
                </div>
                <div className="overall_Item_Box">
                  <span className="overall_Item_1">ส่วนลดคูปอง</span>
                  <span className="overall_Item_2">฿{formatMoney(0)}</span>
                  <span className="overall_Item_3">บาท</span>
                </div>
                <div className="overall_Item_Box">
                  <span className="overall_Item_1">ค่าจัดส่ง</span>
                  <span className="overall_Item_2">฿60</span>
                  <span className="overall_Item_3">บาท</span>
                </div>
              </div>

              <div className="overall_Cart_bottom">
                <div className="overall_Item_Box mb-4">
                  <span className="overall_Item_1">
                    ยอดสุทธิ (รวมภาษีมูลค่าเพิ่ม)
                  </span>
                  <span className="overall_Item_2">
                    ฿{formatMoney(totalAmount + 60)}
                  </span>
                  <span className="overall_Item_3">บาท</span>
                </div>
                <div className="ms-auto">
                  {buyStep > 1 && (
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => sisterStep()}
                    >
                      ย้อนกลับ
                    </button>
                  )}
                  {buyStep === 1 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (Object.keys(userLoginedCart).length === 0) {
                          setNoItemInCart(true);
                        } else {
                          setNoItemInCart(false);
                          showOverlay(750);
                          setTimeout(() => {
                            brotherStep();
                          }, 750);
                        }
                      }}
                    >
                      ระบุที่อยู่
                    </button>
                  )}
                  {buyStep === 2 && (
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitaddressID((address) => {
                        setAddressId(address.address_id);
                        if (userLoginedAddress.length === 0) {
                          setNoAddress(true);
                        } else {
                          setNoAddress(false);
                          showOverlay(750);
                          setTimeout(() => {
                            brotherStep();
                          }, 750);
                        }
                      })}
                    >
                      ชำระเงิน
                    </button>
                  )}
                  {buyStep === 3 && (
                    <button
                      className="btn btn-success"
                      onClick={handleSubmitpayment((data) => {
                        let newDataTransaction = {
                          cart_id: userLoginedCartID,
                          transactionOJ: {
                            user_id: selectAddress.user_id,
                            address_id: selectAddress.address_id,
                            ...data,
                            total_price: totalAmount,
                            shipping_fee: 60,
                            grand_total: totalAmount + 60,
                            cart_product: userLoginedCart,
                          },
                        };
                        CreateTransaction(newDataTransaction);
                      })}
                    >
                      สั่งซื้อ
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="couponBox">
              <div className="d-flex align-items-center gap-3">
                <RiCoupon2Line size={20} />
                <span>ใช้คูปองส่วนลด</span>
              </div>
              <button className="btn w-100 mt-auto">ใช้คูปองส่วนลด</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
