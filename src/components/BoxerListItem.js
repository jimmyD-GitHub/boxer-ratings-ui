import React, { Component } from 'react';

class BoxerListItem extends Component {

  render() {
    return (
      <div className="media" key={this.props.boxer.id}>
        <div className="media-left media-top">
          <div className="frame">
            <span className="rating">{this.props.boxer.rating}</span>
            <img src="/images/boxer-image.jpg" className="media-object"/>
          </div>
        </div>
          <div className="media-body">
            <h4 className="media-heading" id={this.props.boxer.id}>{this.props.boxer.name}</h4>
            <p className="media-metatag">
              ({this.props.boxer.record}) {this.props.boxer.homeTown}
              <span className="star">&#11089;</span> 23765 points
            </p>
            <p>{this.props.boxer.snippet}</p>
          </div>
      </div>
    );
  }

}

export default BoxerListItem;