import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <form className="sign">
        <div className="form-group">
          <h1 id="login">login</h1>
          <label>Email address</label>
          <input
            className="form-control"
            name="email"
            value={this.state.email}
            onChange={this.props.change.bind(this)}
            placeholder="example@gmail.com"
          />
          <label>Password</label>
          <input
            className="form-control"
            value={this.state.password}
            name="password"
            type="password"
            onChange={this.props.change.bind(this)}
            placeholder="*******"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="submit"
          onClick={this.props.loging.bind(this)}
        />

        <label>{this.props.info.loginMessage}</label>
        <label id="error">{this.props.info.errorLogin}</label>
      </form>
    );
  }
}

export default Login;
