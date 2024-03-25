import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

function UncontrolledExample() {
  return (
    <Carousel className="carouselBox">
      <Carousel.Item>
        <img
          className="carouselImg"
          src="https://media-cdn.bnn.in.th/380578/BNNKillerDeal-2000x720-070324_130324update-homepage_desktop_banner_medium.jpg"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImg"
          src="https://media-cdn.bnn.in.th/378020/PreOrdervivoV30Pro-2000x720-290224_140324-homepage_desktop_banner_medium.jpg"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImg"
          src="https://media-cdn.bnn.in.th/380971/AMDSpecialDeal-2000x720-080324_140324-homepage_desktop_banner_medium.jpg"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImg"
          src="https://img.advice.co.th/images_nas/banner/advice_home_1709266686_1.jpg"
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImg"
          src="https://media-cdn.bnn.in.th/370762/ClaimIntelGaming-2000x720-010224_310324-homepage_desktop_banner_medium.jpg"
          alt=""
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
