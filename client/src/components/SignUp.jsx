import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h2>SignUp</h2>
        <label htmlFor="student">student</label>
        <input
          type="radio"
          name="is_teacher"
          id="student"
          value="false"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <label htmlFor="taecher">teacher</label>
        <input
          type="radio"
          name="is_teacher"
          id="teacher"
          value="true"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <input
          type="text"
          name="userName"
          placeholder="your name"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <input
          type="text"
          name="email"
          placeholder="eng.aymanhariri@gmaill.com"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <input
          type="text"
          name="password"
          placeholder="*****"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <input
          type="text"
          name="phone"
          placeholder="780045533"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <input
          type="text"
          name="location"
          placeholder="Amman"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <label id="error">{this.props.error}</label>
        <input
          type="button"
          value="SignUp"
          onClick={this.props.onSignUp.bind(this)}
        />
      </div>
    );
  }
}
export default SignUp;
