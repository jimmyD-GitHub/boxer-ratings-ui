import React from 'react';
import {Helmet} from "react-helmet";
import P4pListLoader from '../components/BoxerList/P4pListLoader';

const PoundForPound = () => (
  <div id="p4p-ratings">
    <Helmet>
      <title>BoxerRatings: Pound For Pound</title>
    </Helmet>
    <div className="col-md-8">
      <div className="alert alert-info alert-dismissible" role="alert">
        Pound for pound lists are purely subjective. Feel free to roast us
        on <a className="alert-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.twitter.com/@boxerRatings">Twitter</a> if
        you disgree with this one!
      </div>
      <h3>Pound For Pound: <span className="white">All Divisions</span></h3>
      <hr/>
      <P4pListLoader/>
    </div>
  </div>
);

export default PoundForPound;