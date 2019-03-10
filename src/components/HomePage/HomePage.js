import React, { Component } from 'react';
import '../../App.css';
import Logo from '../Logo/Logo';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <Logo />
        </div>
        <hr />
        <div className="col-md-6">
          <h2>Features</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            id erat ut massa finibus fringilla eu et odio. Phasellus in erat
            at lorem fermentum commodo vitae nec augue. Aliquam non ultrices
            mauris, ac dictum lectus. Ut vestibulum dui sit amet leo semper,
            in interdum est blandit.
          </p>
          <p>
            Cras congue mi vel augue congue, ac pretium ligula vestibulum.
          </p>
          <p>
            Donec odio lacus, aliquet ac massa in, sollicitudin sollicitudin
            arcu. In consectetur hendrerit aliquam.
          </p>
        </div>
        <div className="col-md-6">
          <img
            className="img-rounded img-responsive"
            src="https://placeimg.com/640/400/tech/grayscale"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Home;
