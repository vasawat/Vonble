import { Link, useParams } from "react-router-dom";
import "./TransactionPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
export default function TransactionPage() {
  const { user_id } = useParams();
  const { findUserTransaction, userLoginedTransaction } =
    useContext(productContext);
    const [sortUserLoginedTransaction, setSortUserLoginedTransaction] = useState([]);
  const [whiceTransaction, setWhiceTransaction] = useState(1);
  const [transactionPaid, setTransactionPaid] = useState([]);
  const [transactionUnpaid, setTransactionUnpaid] = useState([]);
  const [transactionCompleted, setTransactionCompleted] = useState([]);
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
        </div>
        <div className="transactionHeadItemBox">
          <span>Satatus</span>
          <span>ID</span>
          <span>Payment_method</span>
          <span>Shipping_fee</span>
          <span>Grand_total</span>
          <span>Date</span>
          <span>Detail</span>
        </div>
        {whiceTransaction === 1 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              sortUserLoginedTransaction.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status}
                  </span>
                  <span>{item.transaction_id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item.transaction_id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <p>ยังไม่มีการสั่งซื้อ</p>
            )}
          </div>
        )}
        {whiceTransaction === 2 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionPaid.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status}
                  </span>
                  <span>{item.transaction_id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item.transaction_id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <p>ยังไม่มีการสั่งซื้อ</p>
            )}
          </div>
        )}
        {whiceTransaction === 3 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionUnpaid.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status}
                  </span>
                  <span>{item.transaction_id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item.transaction_id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <p>ยังไม่มีการสั่งซื้อ</p>
            )}
          </div>
        )}
        {whiceTransaction === 4 && (
          <div className="transactionBox">
            {sortUserLoginedTransaction.length > 0 ? (
              transactionCompleted.map((item) => (
                <div className="transactionItemBox">
                  <span className={`${item.order_status}`}>
                    {item.order_status}
                  </span>
                  <span>{item.transaction_id}</span>
                  <span>{item.payment_method}</span>
                  <span>฿{item.shipping_fee}</span>
                  <span>฿{item.grand_total}</span>
                  <span>{item.order_date}</span>
                  <Link
                    to={`/user/${user_id}/transaction/${item.transaction_id}`}
                  >
                    Detail
                  </Link>
                </div>
              ))
            ) : (
              <p>ยังไม่มีการสั่งซื้อ</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
