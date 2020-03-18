import React, {Component} from 'react';
import ReactImageFallback from "react-image-fallback";
import '../../assets/css/flags/flags.min.css';

class BoxerListItem extends Component {
  render() {
    const twitter = this.props.boxer.twitterUrl ? <a rel="noopener noreferrer" target="_blank"
                                                     href={this.props.boxer.twitterUrl}>&#160;<span
      className="fa fa-twitter"/>&#160;</a> : null;

    const star = <span className="star">&#11089;</span>;
    const titles = this.props.boxer.titles ? this.props.boxer.titles : null;
    const points = <span>points&#160;</span>;
    const showPoints = this.props.isP4P === false;

    return (
      <div className="media" key={this.props.boxer.id} id={'item-' + this.props.boxer.id}>
        <div className="media-left media-top">
          <div className="frame">
            <span className="rating">{this.props.boxer.rating}</span>
            <ReactImageFallback
              src={process.env.REACT_APP_IMAGE_HOST + this.props.boxer.thumbnail}
              fallbackImage="/images/placeholder.jpg"
              initialImage="/images/spinner.gif"
              alt={this.props.boxer.name}
              className="media-object"/>
          </div>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.boxer.name} &#160;
            <img src="/images/flags/blank.gif"
                 className={'flag flag-' + this.props.boxer.nationality.toLocaleLowerCase()}
                 alt={this.props.boxer.nationality}/>
          </h4>
          <p className="media-metatag">Age: {this.props.boxer.age} &#160;
            <a href={this.props.boxer.boxrecUrl} target="_blank" rel="noopener noreferrer">
              {this.props.boxer.record} <span className="glyphicon glyphicon-new-window" aria-hidden="true"/>
            </a> &#160;{this.props.boxer.homeTown} {showPoints && <span>&#160;</span>}
            {showPoints && star} {showPoints && this.props.boxer.points} {showPoints && points}
            {twitter} {titles}
          </p>
          <p>{this.props.boxer.snippet}</p>
        </div>
      </div>
    );
  }
}

export default BoxerListItem;