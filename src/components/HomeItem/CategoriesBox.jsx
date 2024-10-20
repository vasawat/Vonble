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
              <Link to={`/search/category/66ecff0ca8a044b497cc9851`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UpOlf.png"
                    alt=""
                  />
                  <p className="categoryText">โน๊ตบุ๊ค</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecf73111e27f1ece284694`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UpFt9.png"
                    alt=""
                  />
                  <p className="categoryText">จอคอม</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecfef6a8a044b497cc984e`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UpMNI.png"
                    alt=""
                  />
                  <p className="categoryText">เมาส์</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecfee2a8a044b497cc984b`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UpAt1.png"
                    alt=""
                  />
                  <p className="categoryText">คีย์บอร์ด</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecfe9ba8a044b497cc9848`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22Upocx.png"
                    alt=""
                  />
                  <p className="categoryText">หูฟัง</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecff6da8a044b497cc9857`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UmUGa.png"
                    alt=""
                  />
                  <p className="categoryText">จัดสเปคคอม</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecff20a8a044b497cc9854`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UmDnn.png"
                    alt=""
                  />
                  <p className="categoryText">โต๊ะ & เก้าอี้</p>
                </div>
              </Link>
            </Col>
            <Col>
              <Link to={`/search/category/66ecff20a8a044b497cc9854`}>
                <div className="text-center">
                  <img
                    className="categoryImg"
                    src="https://iili.io/22UpeS4.png"
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
