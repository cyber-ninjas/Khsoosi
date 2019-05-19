import React from "react";
import ReactDOM from "react-dom";
import SignUp from "./components/SignUp.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      img: "",
      summary: "",
      is_teacher: false,
      password: "",
      email: "",
      phone: "",
      location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "",
      startHour: "",
      endHour: ""
    };
  }
  onchangingSignUp(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSignUp(){
    console.log("signup");
  }
  componentDidMount() {}

  render() {
    // var {rating} =this.state;
    // var RatingVaribles = {/*varibles*/}
    return (
      <div>
        <SignUp onchangingSignUp={this.onchangingSignUp.bind(this)} onSignUp={this.onSignUp.bind(this)} is_teacher={this.state.is_teacher}/>
        <h1>Test by Cyber-Ninjas</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
