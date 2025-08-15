import React from 'react';
import { Carousel } from 'react-bootstrap';

function MovieCarousel() {
  return (
    <div className="custom-carousel my-4">
      <Carousel fade>
        <Carousel.Item>
          <img src="/images/movie1.jpg" alt="Galactic Wars" />
          <Carousel.Caption>
            <h5>Galactic Wars</h5>
            <p>Epic space battles decide the fate of a fractured galaxy.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/movie2.jpg" alt="Laugh Out Loud" />
          <Carousel.Caption>
            <h5>Laugh Out Loud</h5>
            <p>A feel-good comedy about friendship and second chances.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/movie3.jpg" alt="Deep Blue" />
          <Carousel.Caption>
            <h5>Deep Blue</h5>
            <p>A gripping survival drama set far from shore.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
