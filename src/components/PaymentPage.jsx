import { useParams } from "react-router-dom";
import QRvasawat from "./imgs/QRvasawat.jpg";
import { useContext, useEffect } from "react";
import { productContext } from "../contexts/productContext";
import "./PaymentPage.css";

export default function PaymentPage(params) {
  const { transactionID } = useParams();
  const { findPaymentData, paymentData } = useContext(productContext);
  useEffect(() => {
    findPaymentData(transactionID);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
  }, [paymentData]);
  return (
    <section className="PaymentPageSection">
      <div className="allItem-Box">
        <h3>Transaction : {transactionID}</h3>
        <h4>โอนได้ ไม่ติด</h4>
        <img className="payQRcode" src={QRvasawat} alt="" />
      </div>
    </section>
  );
}
