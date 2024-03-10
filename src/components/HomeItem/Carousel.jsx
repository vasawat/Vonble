import Carousel from "react-bootstrap/Carousel";
import './Carousel.css'
import Img1 from "../../images/img1.jpg";
import Img2 from "../../images/img2.jpg";
import Img3 from "../../images/img3.jpg";
import Img4 from "../../images/img4.jpg";

function UncontrolledExample() {
  return (
    <Carousel className="carouselBox">
      <Carousel.Item>
        <img className="carouselImg" src={Img1} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={Img2} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={Img3} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={Img4} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
