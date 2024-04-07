import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import "./PaymentPage.css";

export default function PaymentPage(params) {
  const { transactionID } = useParams();
  const { findPaymentData, paymentData } =
    useContext(productContext);
  const [testdata, setTestdata] = useState({});
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    findPaymentData(transactionID);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setTestdata(paymentData);
    setQrCode(paymentData.qrcode);
  }, [paymentData]);
  return (
    <section className="PaymentPageSection">
      <div className="allItem-Box">
        <h3>Transaction : {transactionID}</h3>
        {testdata && (
          <div>
            <h5>ราคารวม : {testdata.grand_total} บาท</h5>
            <h5>จ่ายโดย : {testdata.payment_method}</h5>
            <h5>สถานะ : ยังไม่ได้ชำระเงิน</h5>
          </div>
        )}
        {qrCode && <img className="payQRcode" src={qrCode} alt="" />}
        <p>โอนมาไม่คืนเด้อ</p>
        {/* <div>
          <button className="btn btn-success" onClick={() => testKbank()}>
            ทดลองกสิกร
          </button>
        </div> */}
        
      </div>
    </section>
  );
}
