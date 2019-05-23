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
        <div className="topnav">
          <input
            className="signbtn"
            type="button"
            value="SignUp"
            onClick={() => this.openModal("SignUp")}
          />
          <input
            className="signbtn"
            type="button"
            value="Login"
            onClick={() => this.openModal("Login")}
          />
        </div>
        <img
          id="img"
          src="https://www.trentu.ca/english/sites/trentu.ca.english/files/styles/header_image/public/header_images/header_creative_writing2.jpg?itok=qqMcjzSZ"
        />
        <Modal
          visible={this.state.SignUp}
          width="600"
          height="350"
          effect="fadeInDown"
          onClickAway={() => this.closeModal("SignUp")}
        >
          <div>
            <SignUp closeModal={this.closeModal.bind(this)} />
          </div>
        </Modal>
        <Modal
          visible={this.state.Login}
          width="400"
          height="300"
          effect="fadeInDown"
          onClickAway={() => this.closeModal("Login")}
        >
          <div>
            <Login onLogin={this.props.onLogin.bind(this)} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
