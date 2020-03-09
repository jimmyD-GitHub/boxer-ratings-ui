import React, {Component} from 'react';
import UserActions from '../../store/Actions/UserActions';

export class ConfirmEmailMessage extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    UserActions.clearSignUp();
  }

  simulateClick(event) {
    return event ? event.click() : null;
  }

  render() {
    return (
      <p ref={this.simulateClick} className="alert alert-info alert-dismissible" role="alert">
        <button onClick={this.handleClose} type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <strong>Hello {this.props.name}.</strong> A confirmation email has been sent to &nbsp;
        <strong>{this.props.email}</strong>, please click the link in the email to confirm sign up. &nbsp;
      </p>
    );
  }
}

export default ConfirmEmailMessage;