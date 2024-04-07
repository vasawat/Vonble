import "./CategoriesBox.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export default function CategoriesBox() {
  return (
    <section className="SectionCategoriesBox">
      <div className="allItem-Box">
        <Container>
          <Row>
            <Col>
              <Link to={`/search/category/3`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductNotebook4.png"
                    alt=""
                  />
                  <p className="categoryText">โน๊ตบุ๊ค</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/1`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductGamingMonitor3.png"
                    alt=""
                  />
                  <p className="categoryText">จอคอม</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/2`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductMouse4.png"
                    alt=""
                  />
                  <p className="categoryText">เมาส์</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/4`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductKeyboard4.png"
                    alt=""
                  />
                  <p className="categoryText">คีย์บอร์ด</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/8`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductHeadphone1.png"
                    alt=""
                  />
                  <p className="categoryText">หูฟัง</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/7`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductComputerItem2.png"
                    alt=""
                  />
                  <p className="categoryText">จัดสเปคคอม</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/9`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductGamingChair2.png"
                    alt=""
                  />
                  <p className="categoryText">โต๊ะ & เก้าอี้</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/10`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://vasawatawsvonble.s3.amazonaws.com/MjnProductSmartWatch1.png"
                    alt=""
                  />
                  <p className="categoryText">สมาร์ทแกดเจ็ต</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
