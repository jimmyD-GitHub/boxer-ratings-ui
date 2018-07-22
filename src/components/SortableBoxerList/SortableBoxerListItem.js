import React, {Component} from 'react';
import ReactImageFallback from "react-image-fallback";
import '../../assets/css/flags/flags.min.css';

class SortableBoxerListItem extends Component {
  render() {
    return (
      <li className="media" key={this.props.boxer.id} id={this.props.boxer.id}>
        <div className="media-left">
          <a>
            <div className="frame">
              <ReactImageFallback
                src={this.props.boxer.thumbnail}
                fallbackImage="/images/thumbs/placeholder.jpg"
                initialImage="/images/spinner.gif"
                alt={this.props.boxer.name}
                className="media-object"/>
            </div>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">
            {this.props.boxer.name}&#160;
            <small>({this.props.boxer.record}) {this.props.boxer.homeTown} &#160;</small>
            <img src="/images/flags/blank.gif"
                 className={'flag flag-' + this.props.boxer.nationality.toLocaleLowerCase()}
                 alt={this.props.boxer.nationality}/>
          </h4>
          <p>{this.props.boxer.snippet}</p>
        </div>
      </li>
    );
  }
}

export default SortableBoxerListItem;