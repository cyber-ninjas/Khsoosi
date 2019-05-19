import React from "react";
import ReactDOM from "react-dom";
import Rating from "./components/Rating.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      img: "",
      summary: "",
      is_teacher: "",
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

  onRatingChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    });
  }

  rating(){
    const body = {ratingText: this.state.ratingText, rate: this.state.rate};
    fetch('/rating', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ratingText: '', rate: ''});
    });
  }

  componentDidMount() { }

  render() {
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = { ratingText, rate, current_studentId, current_teacherId };
    return (
      <div>
        <h1>Test</h1>
        <Rating RatingVariables={RatingVariables} onChange={event => this.onRatingChange(event)} onClick={event => this.rating(event)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
