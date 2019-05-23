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
      <form className="sign">
        <div className="form-group">
          <h2>SignUp</h2>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="is_teacher"
              id="student"
              value="false"
              onChange={this.change1.bind(this)}
            />
            <label className="form-check-label" htmlFor="student">
              student
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="is_teacher"
              id="teacher"
              value="true"
              onChange={this.change1.bind(this)}
            />
            <label id="Tlabel" className="form-check-label" htmlFor="taecher">
              teacher
            </label>
          </div>
          <input
            className="form-control"
            type="text"
            name="userName"
            placeholder="your name"
            onChange={this.props.change.bind(this)}
          />
          <input
            className="form-control"
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
            className="form-control"
          />
          <input
            type="text"
            name="phone"
            placeholder="7777788888"
            onChange={this.props.change.bind(this)}
            className="form-control"
          />
          <input
            type="text"
            name="location"
            placeholder="Amman"
            onChange={this.props.change.bind(this)}
            className="form-control"
          />
        </div>
        <input
          className="btn btn-primary"
          type="button"
          value="SignUp"
          onClick={this.props.onSignUp.bind(this)}
        />
        <label id="error">{this.props.error}</label>
      </form>
    );
  }
}
export default SignUp;
