import React from "react";

class Rating extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { RatingVariables } = this.props;
    return (
      <div>
        <h3>Give us your feedback :</h3>
        <input
          type="text"
          placeholder="testimonial"
          value={RatingVariables.ratingText}
          onChange={this.props.change.bind(this)}
          name="ratingText"
        />
        <input
          type="number"
          placeholder="rate"
          min={0}
          max={10}
          value={RatingVariables.rate}
          onChange={this.props.change.bind(this)}
          name="rate"
        />
        <button onClick={this.props.rating.bind(this)}>submit</button>
        <label id="rateMessage">{this.props.rateMessage}</label>
      </div>
    );
  }
}

export default Rating;
