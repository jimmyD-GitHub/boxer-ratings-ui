import React, { Component } from 'react';

class ErrorMessage extends Component {
  render() {
    return (
      <p className="alert alert-danger" role="alert">
        <strong>Oops!</strong> {this.props.message}
      </p>
    );
  }
}

export default ErrorMessage;