import "./CategoriesBox.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CategoriesBox() {
  return (
    <section className="SectionBox">
      <div className="allItem-Box">
        <Container>
        <Row>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309123733_Category_Icon-23.jpg"
                alt=""
              />
              <p className="categoryText">โน๊ตบุ๊ค</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309137645_Category_Icon-25.jpg"
                alt=""
              />
              <p className="categoryText">จอคอม</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309137646_Category_Icon-27.jpg"
                alt=""
              />
              <p className="categoryText">เมาส์</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309137647_Category_Icon-28.jpg"
                alt=""
              />
              <p className="categoryText">คีย์บอร์ด</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309137648_Category_Icon-30.jpg"
                alt=""
              />
              <p className="categoryText">คอมพิวเตอร์เซต</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/homepage/sections/13/spaces/15/1696309137648_Category_Icon-31.jpg"
                alt=""
              />
              <p className="categoryText">จัดสเปคคอม</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/menu/headphone.jpg"
                alt=""
              />
              <p className="categoryText">หูฟัง</p>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <img
                className="categoryImg"
                src="https://cdn.mercular.com/images/menu/gaming-chair.jpg"
                alt=""
              />
              <p className="categoryText">โต๊ะ & เก้าอี้</p>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
      
    </section>
  );
}
