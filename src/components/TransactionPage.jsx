import { Link, useParams } from "react-router-dom";
import "./TransactionPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
export default function TransactionPage() {
  const { user_id } = useParams();
  const { findUserTransaction, userLoginedTransaction,formatMoney } =
    useContext(productContext);
  const [sortUserLoginedTransaction, setSortUserLoginedTransaction] = useState(
    []
  );
  const [whiceTransaction, setWhiceTransaction] = useState(1);
  const [transactionPaid, setTransactionPaid] = useState([]);
  const [transactionUnpaid, setTransactionUnpaid] = useState([]);
  const [transactionCompleted, setTransactionCompleted] = useState([]);
  const [transactionCancel, setTransactionCancel] = useState([]);
  useEffect(() => {
    findUserTransaction(user_id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (userLoginedTransaction) {
      let newT = Object.values(userLoginedTransaction).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      setSortUserLoginedTransaction(newT);
    }
  }, [userLoginedTransaction]);
  useEffect(() => {
    if (sortUserLoginedTransaction.length > 0) {
      setTransactionPaid(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "PaymentReceived"
        )
      );
      setTransactionUnpaid(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "PendingPayment"
        )
      );
      setTransactionCompleted(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "completed"
        )
      );
      setTransactionCancel(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "Cancelled"
        )
      );
    }
  }, [sortUserLoginedTransaction]);
  return (
    <section className="TransactionPageSection">
      <div className="allItem-Box">
        <div className="transactionBoxSelecter">
          <button
            className={`transactionBtn ${
              whiceTransaction === 1 && "transactionBtnActive"
            }`}
            onClick={() => setWhiceTransaction(1)}
          >
            คำสั่งซื้อทั้งหมด
          </button>
          <button
            className={`transactionBtn ${
              whiceTransaction === 2 && "transactionBtnActive"
            }`}
            onClick={() => setWhiceTransaction(2)}
          >
            ชำระเงินแล้ว
          </button>
          <button
            className={`transactionBtn ${
              whiceTransaction === 3 && "transactionBtnActive"
            }`}
            onClick={() => setWhiceTransaction(3)}
          >
            ยังไม่ได้ชำระเงิน
          </button>

          <button
            className={`transactionBtn ${
              whiceTransaction === 4 && "transactionBtnActive"
            }`}
            onClick={() => setWhiceTransaction(4)}
          >
            สำเร็จ
          </button>

          <button
            className={`transactionBtn ${
              whiceTransaction === 5 && "transactionBtnActive"
            }`}
            onClick={() => setWhiceTransaction(5)}
          >
            ยกเลิก
          </button>
        </div>
        <div className="transactionHeadItemBox">
          <span>สถานะ</span>
          <span>เลขคำสั่งซื้อ</span>
          <span>วิธีชำระเงิน</span>
          <span>ค่าส่ง</span>
          <span>ราคาสุทธิ</span>
          <span>วัน/เวลาที่สั่ง</span>
          <span>รายละเอียด</span>
        </div>
        {whiceTransaction === 1 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              sortUserLoginedTransaction.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status === "PendingPayment" && "รอชำระเงิน"}
                    {item.order_status === "PaymentReceived" && "ชำระเงินแล้ว"}
                    {item.order_status === "completed" && "สำเร็จ"}
                    {item.order_status === "Cancelled" && "ยกเลิก"}
                  </span>
                  <span>{item._id}</span>
                  {item.payment_method === "cashondelivery" ? (
                    <span>ชำระเงินปลายทาง</span>
                  ) : (
                    <span>{item.payment_method}</span>
                  )}
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{formatMoney(item.grand_total)}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item._id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <div className="noItemBox">
                <p>ยังไม่มีการสั่งซื้อ</p>
              </div>
            )}
          </div>
        )}
        {whiceTransaction === 2 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionPaid.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status === "PaymentReceived" && "ชำระเงินแล้ว"}
                  </span>
                  <span>{item._id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item._id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <div className="noItemBox">
                <p>ยังไม่มีการสั่งซื้อที่ชำระเเล้ว</p>
              </div>
            )}
          </div>
        )}
        {whiceTransaction === 3 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionUnpaid.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status === "PendingPayment" && "รอชำระเงิน"}
                  </span>
                  <span>{item._id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item._id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <div className="noItemBox">
                <p>ยังไม่มีการสั่งซื้อที่ค้างชำระ</p>
              </div>
            )}
          </div>
        )}
        {whiceTransaction === 4 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionCompleted.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status === "completed" && "สำเร็จ"}
                  </span>
                  <span>{item._id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item._id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <div className="noItemBox">
                <p>ยังไม่มีการสั่งซื้อที่สำเร็จ</p>
              </div>
            )}
          </div>
        )}
        {whiceTransaction === 5 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionCancel.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status === "Cancelled" && "ยกเลิก"}
                  </span>
                  <span>{item._id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item._id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <div className="noItemBox">
                <p>ยังไม่มีการสั่งซื้อที่ยกเลิก</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
