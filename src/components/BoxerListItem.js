import React, {Component} from 'react';
import ReactImageFallback from "react-image-fallback";
import '../assets/css/flags/flags.min.css';

class BoxerListItem extends Component {
  render() {
    return (
      <div className="media" key={this.props.boxer.id} id={this.props.boxer.id}>
        <div className="media-left media-top">
          <div className="frame">
            <span className="rating">{this.props.boxer.rating}</span>
            <ReactImageFallback
              src={this.props.boxer.thumbnail}
              fallbackImage="/images/thumbs/placeholder.jpg"
              alt={this.props.boxer.name}
              className="media-object"/>
          </div>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.boxer.name}</h4>
          <p className="media-metatag">
            ({this.props.boxer.record}) {this.props.boxer.homeTown} &#160;
            <span className="star">&#11089;</span> 23765 points &#160;
            <img src="/images/flags/blank.gif" className="flag flag-ua" alt="Ukraine"/>
          </p>
          <p>{this.props.boxer.snippet}</p>
        </div>
      </div>
    );
  }
}

export default BoxerListItem;