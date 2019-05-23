import React from "react";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      is_teacher: false,
      password: "",
      email: "",
      phone: "",
      location: "",
      error: ""
    };
  }
  onSignUp() {
    const {
      userName,
      password,
      email,
      is_teacher,
      phone,
      location
    } = this.state;
    const body = { userName, is_teacher, password, email, phone, location };
    fetch("/signup", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        if (body.error)
          this.setState({
            error: body.error,
            userName: "",
            is_teacher: "",
            password: "",
            email: "",
            phone: "",
            location: ""
          });
        else {
          this.setState({
            error: "Thank you please Login Now!",
            userName: "",
            is_teacher: "",
            password: "",
            email: "",
            phone: "",
            location: ""
          });
        }
      })
      .catch(err => console.log("Error"));
  }

  change(e) {
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
            value={this.state.userName}
            placeholder="your name"
            onChange={this.change.bind(this)}
          />
          <input
            className="form-control"
            type="text"
            value={this.state.email}
            name="email"
            placeholder="example@gmaill.com"
            onChange={this.change.bind(this)}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="*****"
            onChange={this.change.bind(this)}
            className="form-control"
          />
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            placeholder="7777788888"
            onChange={this.change.bind(this)}
            className="form-control"
          />
          <input
            type="text"
            name="location"
            value={this.state.location}
            placeholder="Amman"
            onChange={this.change.bind(this)}
            className="form-control"
          />
        </div>
        <input
          className="btn btn-primary"
          type="button"
          value="SignUp"
          onClick={this.onSignUp.bind(this)}
        />
        <label id="error">{this.info.error}</label>
        <br />
        <label className="form-check-label" htmlFor="login">
          Already have an account? Login
        </label>
      </form>
    );
  }
}
export default SignUp;
