import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h2>SignUp</h2>
        <label htmlFor="student">student</label>
<<<<<<< HEAD
        <input type="radio" name="is_teacher" id="student"  value = "false" onChange={this.props.onchangingSignUp.bind(this)}/>
        <label htmlFor="teacher">teacher</label>
        <input type="radio" name="is_teacher" id="teacher" value = "true" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="userName" placeholder="your name" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="email" placeholder="eng.aymanhariri@gmaill.com" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="password" placeholder="*****" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="phone" placeholder="780045533" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="location" placeholder="Amman" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="button" value="SignUp" onClick={this.props.onSignUp.bind(this)}/>
=======
        <input
          type="radio"
          name="is_teacher"
          id="student"
          value="false"
          onChange={this.props.onchangingSignUp.bind(this)}
        />
        <label htmlFor="taecher">taecher</label>
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
>>>>>>> 8ba152a8b1f23f540bba5cef5ff2c64b9fb589c5
      </div>
    );
  }
}
export default SignUp;
