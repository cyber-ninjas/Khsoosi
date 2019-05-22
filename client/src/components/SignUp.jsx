import React from "react";
// import Login from "./login.jsx";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_teacher: false
    };
  }
  change1(e) {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className="form-control form-control-lg">
        <h2>SignUp</h2>
        <label htmlFor="student">student</label>
        <input
          type="radio"
          name="is_teacher"
          id="student"
          value="false"
          onChange={this.change1.bind(this)}
        />
        <label htmlFor="taecher">teacher</label>
        <input
          type="radio"
          name="is_teacher"
          id="teacher"
          value="true"
          onChange={this.change1.bind(this)}
        />
        <input
          type="text"
          name="userName"
          placeholder="your name"
          onChange={this.props.change.bind(this)}
        />
        <input
          type="text"
          name="email"
          placeholder="example@gmaill.com"
          onChange={this.props.change.bind(this)}
        />
        <input
          type="text"
          name="password"
          placeholder="*****"
          onChange={this.props.change.bind(this)}
        />
        <input
          type="text"
          name="phone"
          placeholder="7777788888"
          onChange={this.props.change.bind(this)}
        />
        <input
          type="text"
          name="location"
          placeholder="Amman"
          onChange={this.props.change.bind(this)}
        />
        <label id="error">{this.props.error}</label>
        <input
          type="button"
          value="SignUp"
          onClick={this.props.onSignUp.bind(this, this.state.is_teacher)}
        />
      </div>
    );
  }
}
export default SignUp;
