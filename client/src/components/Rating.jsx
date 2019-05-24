import React from "react";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingText: "",
      rate: "",
      rateMessage: ""
    };
  }
  rating(e) {
    e.preventDefault();
    const body = {
      ratingText: this.state.ratingText,
      rate: this.state.rate,
      current_studentId: this.state.current_studentId,
      current_teacherId: this.state.current_teacherId
    };
    fetch("/rating", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        // console.log(body);
        this.setState({
          ratingText: "",
          rate: "",
          rateMessage: "Thank you for your feedback!"
        });
      });
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
          <h2>Give your teacher feedback :</h2>
          <input
            className="form-control"
            type="text"
            placeholder="testimonial"
            value={this.state.ratingText}
            onChange={this.change.bind(this)}
            name="ratingText"
          />
          <input
            className="form-control"
            type="number"
            placeholder="rate"
            min={0}
            max={10}
            value={this.state.rate}
            onChange={this.change.bind(this)}
            name="rate"
          />
        </div>
        <button className="btn btn-primary" onClick={this.rating.bind(this)}>
          submit
        </button>
        <label id="rateMessage">{this.rateMessage}</label>
      </form>
    );
  }
}

export default Rating;
