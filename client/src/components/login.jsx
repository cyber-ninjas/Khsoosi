import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>login</h1>
        <input
          name="email"
          onChange={this.props.change.bind(this)}
          placeholder="example@gmail.com"
        />
        <input
          name="password"
          type="password"
          onChange={this.props.change.bind(this)}
          placeholder="*******"
        />
        <button onClick={this.props.loging.bind(this)}> login</button>
        <label>{this.props.loginMessage}</label>
        <label id="error">{this.props.errorLogin}</label>
      </div>
    );
  }
}

export default Login;
