import "./Footer.css";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsCash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section className="sectionFooter">
      <div className="scrolling-text">
        <p className="text-scrolling">Welcome to Vonble.</p>
      </div>

      <div className="footer-item-1">
        <div className="footer-item-1-1">
          <TbTruckDelivery className="me-3" size={40} />

          <div>
            <div>จัดส่งฟรี</div>
            <div>เมื่อซื้อครบ 900,000.-</div>
          </div>
        </div>
        <div className="footer-item-1-1">
          <IoMdCheckmarkCircleOutline className="me-3" size={40} />
          <div>
            <div>ประกันศูนย์ไทย</div>
            <div>เคลมง่ายทั้งหน้าร้านและออนไลน์</div>
          </div>
        </div>
        <div className="footer-item-1-1">
          <BsCash className="me-3" size={40} />
          <div>
            <div>เก็บเงินปลายทาง</div>
            <div>ของถึงมือ แล้วค่อยจ่าย</div>
          </div>
        </div>
      </div>

      <div className="footer-item-2">
        <div className="">
          <div>ติดต่อเรา</div>
          <div className="socialMediaBox">
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/facebook.png"
                alt=""
              />
            </Link>
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/twitter.png"
                alt=""
              />
            </Link>
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/tiktok.png"
                alt=""
              />
            </Link>
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/youtube.png"
                alt=""
              />
            </Link>
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/instagram.png"
                alt=""
              />
            </Link>
            <Link to="/" className="p-1">
              <img
                className="socialMediaLogo"
                src="https://www.mercular.com/images/social/line.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
