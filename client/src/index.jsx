import React from "react";
import ReactDOM from "react-dom";

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
  componentDidMount() {}

  render() {
    // var {rating} =this.state;
    // var RatingVaribles = {/*varibles*/}
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
