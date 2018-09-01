import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className={this.props.path === '/forgot-password' ? 'footer navbar-fixed-bottom' : 'footer'}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <a className="navbar-brand" href="">
                <img src="/images/br-logo.svg" alt="BoxerRatings"/>
              </a>
            </div>
            {/*<div className="col-lg-2 col-md-2">
          <h4>Links</h4>
          <ul className="list-unstyled">
            <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-footer-link"/>
            <MenuLink to="/my-ratings" label="My Ratings" id="my-ratings-footer-link"/>
            <li><a href="/p4p-ratings">Pound For Pound</a></li>
          </ul>
        </div>*/}
            <div className="col-lg-4 col-md-4">
              <h4>About</h4>
              <p>This website allows boxing fans to provide and maintain their own rankings per division.
                The rankings supplied by all users are combined to generate our overall boxer ratings.
                It is hoped that this fan powered system will create a useful alternative to the ratings made
                available by official sanctioning bodies and media outlets.</p>
            </div>
            <div className="col-lg-2 col-md-2 text-right">
              <h4>Follow us</h4>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="https://twitter.com/@boxerRatings" target="_blank"
                     rel="noopener noreferrer" title="Twitter">
                    <i className="fa fa-twitter fa-2x"/>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.facebook.com/" target="_blank"
                     rel="noopener noreferrer" title="Facebook">
                    <i className="fa fa-facebook fa-2x"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;