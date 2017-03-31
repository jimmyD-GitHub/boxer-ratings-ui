import React, { Component } from 'react';

class ErrorMessage extends Component {
  render() {
    return (
      <p className="alert alert-danger" role="alert">
        <strong>Oops!</strong> No boxer ratings could be found for this division.
      </p>
    );
  }
}

export default ErrorMessage;