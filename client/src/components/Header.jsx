import React from "react";
import Modal from "react-awesome-modal";
import SignUp from "./SignUp.jsx";
import Login from "./login.jsx";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignUp: false,
      Login: false
    };
  }

  openModal(e) {
    this.setState({
      [e]: true
    });
  }

  closeModal(e) {
    this.setState({
      [e]: false
    });
  }
  render() {
    return (
      <div>
        <img src="https://www.trentu.ca/english/sites/trentu.ca.english/files/styles/header_image/public/header_images/header_creative_writing2.jpg?itok=qqMcjzSZ" />
        <div className="topnav">
          <input
            type="button"
            value="SignUp"
            className="sign"
            onClick={() => this.openModal("SignUp")}
          />
          <input
            type="button"
            value="Login"
            className="sign"
            onClick={() => this.openModal("Login")}
          />
        </div>
        <Modal
          visible={this.state.SignUp}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal("SignUp")}
        >
          <div>
            <SignUp
              change={this.props.change.bind(this)}
              onSignUp={this.props.onSignUp.bind(this)}
              is_teacher={this.props.is_teacher}
              error={this.props.error}
            />
          </div>
        </Modal>
        <Modal
          visible={this.state.Login}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal("Login")}
        >
          <div>
            <Login
              change={this.props.change.bind(this)}
              loging={this.props.loging.bind(this)}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
