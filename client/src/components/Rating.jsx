import React from 'react';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

//   onChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//     console.log(e.target.value)
//   }

  onClick(e) {
    console.log(RatingVariables.text, RatingVariables.rate)
  }


  render() {
      const {RatingVariables} = this.props;
      //console.log(this.props)
    return (
      <div>
        <h3>Give us your feedback :</h3>
        <input type='text' placeholder='testimonial' value={RatingVariables.text} onChange={event => this.props.onChange(event)} name="text" />
        <input type = 'number' placeholder='rate' min={0} max={10} value={RatingVariables.rate} onChange={event => this.props.onChange(event)} name="rate"/>
        <button onClick={event => this.onClick(event)}>submit</button>
      </div>
    )
  }
}

export default Rating;