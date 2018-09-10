import React, {Component} from 'react';

class ConfirmEmailMessage extends Component {

  simulateClick(event) {
    return event ? event.click() : null;
  }

  render() {
    return (
      <p ref={this.simulateClick} className="alert alert-info" role="alert">
        <strong>Hello {this.props.name}.</strong> A confirmation email has been sent to &nbsp;
        <strong>{this.props.email}</strong>, please click the link in the email to confirm sign up. &nbsp;
      </p>
    );
  }
}

export default ConfirmEmailMessage;