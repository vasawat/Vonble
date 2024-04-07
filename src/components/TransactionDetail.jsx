import { Link, useParams } from "react-router-dom";
import "./TransactionDetail.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import { FiMapPin } from "react-icons/fi";

export default function TransactionDetail() {
  const { user_id, transectionID } = useParams();
  const {
    findTransactionDetail,
    transactionDetail,
    deleteTransaction,
    showOverlay,
    formatMoney,
  } = useContext(productContext);
  const [thisTransactionProduct, setThisTransactionProduct] = useState([]);
  const [thisTransactionAddress, setThisTransactionAddress] = useState({});
  useEffect(() => {
    showOverlay(700);
    findTransactionDetail(transectionID);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setThisTransactionProduct(transactionDetail.cart_product);
    setThisTransactionAddress(transactionDetail.address);
  }, [transactionDetail]);
  console.log(thisTransactionProduct);
  return (
    <section className="TransactionDetailSection">
      <div className="allItem-Box">
        <div className="TransactionDetailBox">
          <h4>คำสั่งซื้อ : {transectionID}</h4>
          <span>สั่งซื้อวันที่ : {transactionDetail.order_date}</span>
          {transactionDetail &&
          transactionDetail.order_status === "PendingPayment" ? (
            <div className="statusBox">
              <span>สถานะคำสั่งซื้อ : รอชำระเงิน</span>
              <Link
                to={`/user/${user_id}/payment/${transectionID}`}
                className="btn btn-success ms-2"
              >
                ชำระเงิน
              </Link>
              <div
                className="btn btn-danger ms-2"
                onClick={() => {
                  deleteTransaction(transectionID);
                }}
              >
                ยกเลิกคำสั่งซื้อ
              </div>
            </div>
          ) : (
            <div className="statusBox">
              {transactionDetail.order_status === "PaymentReceived" && (
                <span>สถานะคำสั่งซื้อ : ชำระเงินแล้ว รอจัดส่ง</span>
              )}
              {transactionDetail.order_status === "completed" && (
                <span>สถานะคำสั่งซื้อ : สำเร็จ</span>
              )}
              {transactionDetail.order_status === "Cancelled" && (
                <span>สถานะคำสั่งซื้อ : ยกเลิก</span>
              )}
            </div>
          )}

          <div className="userAddressBox mb-4">
            {thisTransactionAddress && thisTransactionAddress.address ? (
              <div>
                <header className="userAddressBoxHead">
                  <FiMapPin size={20} />
                  <span>{thisTransactionAddress.name}</span>
                  <span>{thisTransactionAddress.phone_number}</span>
                </header>
                <div className="userAddressBoxContent">
                  <span>{thisTransactionAddress.address}</span>/
                  <span>{thisTransactionAddress.subdistrict}</span>/
                  <span>{thisTransactionAddress.district}</span>/
                  <span>{thisTransactionAddress.province}</span>/
                  <span>{thisTransactionAddress.postal_code}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="productTransactionBox">
            <table className="productTransactionTable">
              <tbody>
                {thisTransactionProduct && thisTransactionProduct.length > 0
                  ? thisTransactionProduct.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            className="imageTransactionDetailProduct"
                            src={product.image_url}
                            alt=""
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.count} ชิ้น</td>
                        <td>฿{formatMoney(product.price * product.count)}</td>
                      </tr>
                    ))
                  : null}
                <tr>
                  <td>คูปองส่วนลด</td>
                  <td></td>
                  <td></td>
                  <td>฿0</td>
                </tr>
                <tr>
                  <td>ค่าส่ง</td>
                  <td></td>
                  <td></td>
                  <td>฿60</td>
                </tr>
                <tr>
                  <td>ราคาสุทธิ</td>
                  <td></td>
                  <td></td>
                  <td>฿{formatMoney(transactionDetail.grand_total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
