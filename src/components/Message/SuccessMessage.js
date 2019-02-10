import React, {Component} from 'react';

class SuccessMessage extends Component {
  render() {
    const fadeout = this.props.fadeout ? ' fadeout' : '';
    return (
      <p className={"alert alert-success" + fadeout} role="alert">
        <strong>Thanks!</strong> {this.props.message}
      </p>
    );
  }
}

export default SuccessMessage;