import React from 'react';

class Rating extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { RatingVariables } = this.props;
    return (
      <div>
        <h3>Give us your feedback :</h3>
        <input type='text' placeholder='testimonial' value={RatingVariables.ratingText} onChange={event => this.props.onChange(event)} name="ratingText" />
        <input type='number' placeholder='rate' min={0} max={10} value={RatingVariables.rate} onChange={event => this.props.onChange(event)} name="rate" />
        <button onClick={event => this.props.onClick(event)}>submit</button>
      </div>
    )
  }
}

export default Rating;