import Carousel from 'react-bootstrap/Carousel';

import cinema from '../../images/cinema.jpg';
import last from '../../images/last.jpg';
import max from '../../images/max.jpg';


function Slider() {
  return (
    <Carousel >
      <Carousel.Item>
      <img src={cinema} className='d-block w-100' alt='logo' />
        <Carousel.Caption>
          <h3>Critique du film</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={max} className='d-block w-100 ' alt='logo' />
              <Carousel.Caption>
          <h3>Critique du film</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={last} className='d-block w-100' alt='logo' />
             <Carousel.Caption>
          <h3>Critique du film</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;