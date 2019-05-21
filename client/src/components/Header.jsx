import React from "react";
import Modal from "react-awesome-modal";
import SignUp from "./SignUp.jsx";
import Login from "./login.jsx";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div>
        <img src="https://www.trentu.ca/english/sites/trentu.ca.english/files/styles/header_image/public/header_images/header_creative_writing2.jpg?itok=qqMcjzSZ" />
        <section>
          {/* <div className="topnav">
          <Link className="sign" to="/SignUp" onClick={() => this.openModal()}>
            {" "}
            SignUp
          </Link>
          <Link className="sign" to="/Login">
            {" "}
            Login
          </Link>
        </div> */}
        <input type="button" value="Open" onClick={() => this.openModal()} />
          <Modal
            visible={this.state.visible}
            width="400"
            height="300"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <div>
              {/* <Route
                path="/SignUp"
                component={() => {
                  return ( */}
                    <SignUp
                      onchanging={this.props.onchanging.bind(this)}
                      onSignUp={this.props.onSignUp.bind(this)}
                      is_teacher={this.props.is_teacher}
                      error={this.props.error}
                    />
                  {/* );
                }}
              /> */}
            </div>
          </Modal>
        </section>

        <Route
          path="/Login"
          component={() => {
            return (
              <Login
                onchanging={this.props.onchanging.bind(this)}
                loging={this.props.loging.bind(this)}
              />
            );
          }}
        />
        
      </div>
    );
  }
}

export default Header;
