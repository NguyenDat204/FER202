import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function HeroSlider() {
  return (
    <Carousel fade interval={3500} pause="hover" style={{ maxHeight: "500px", overflow: "hidden" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide1.jpg"
          alt="Hot deals on smartphones"
          style={{ maxHeight: "1000px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Smartphone Sale</h3>
          <p>Hot deals this week</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide2.jpg"
          alt="New arrivals laptops"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>New Laptops</h3>
          <p>Lightweight. Powerful.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide3.jpg"
          alt="Accessories and more"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Accessories</h3>
          <p>Make your setup complete</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
