import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import MjnVonble1 from "../imgs/MjnVonble1.png";
import MjnVonble2 from "../imgs/MjnVonble2.png";
import MjnVonble3 from "../imgs/MjnVonble3.png";
import MjnVonble4 from "../imgs/MjnVonble4.png";

function UncontrolledExample() {
  return (
    <Carousel data-bs-theme="dark" className="carouselBox">
      <Carousel.Item>
        <img className="carouselImg" src={MjnVonble1} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={MjnVonble2} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={MjnVonble3} alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={MjnVonble4} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
