import React from "react";
import { Carousel } from "react-bootstrap";

const AppCarousel = () => {
  return (
    <Carousel className="mb-4" fade interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src="images/uthappizza.png" alt="slide1" />
        <Carousel.Caption>
          <h2 className="fw-bold">Khám phá sản phẩm mới</h2>
          <p>Ưu đãi hấp dẫn, cập nhật liên tục</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/zucchipakoda.png" alt="slide2" />
        <Carousel.Caption>
          <h2 className="fw-bold">Giảm giá siêu hot</h2>
          <p>Mua ngay kẻo lỡ</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/vadonut.png" alt="slide3" />
        <Carousel.Caption>
          <h2 className="fw-bold">Sản phẩm yêu thích</h2>
          <p>Top trending tháng này</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default AppCarousel;
