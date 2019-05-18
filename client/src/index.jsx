import React from "react";
import ReactDOM from "react-dom";
import Rating from "./components/Rating.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        cvFile: "",
        img: "",
        summary: "",
        is_teacher: "",
        password: "",
        email: "",
        phone: "",
        location: ""
      },
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      rating: {
        text: "",
        rate: ""
      },
      subject: {
        subjectName: "",
        level: ""
      },
      Schedule: {
        day: "",
        startHour: "",
        endHour: ""
      }
    };
  }

  onChange(e) {
    this.setState({
      rating:{[e.target.name]: e.target.value}
    });
    console.log(this.state)
  }
  componentDidMount() {}

  render() {
    var {rating} =this.state;
    return (
      <div>
        <h1>Test</h1>
        <Rating RatingVariables = {rating} onChange = {this.onChange.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
