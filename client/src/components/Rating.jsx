import React from 'react';

class Rating extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { RatingVariables } = this.props;
		return (
			<form className="sign">
				<div className="form-group">
					<h2>Give the teacher your feedback :</h2>
					<input
						className="form-control"
						type="text"
						placeholder="testimonial"
						value={RatingVariables.ratingText}
						onChange={this.props.change.bind(this)}
						name="ratingText"
					/>
					<input
						className="form-control"
						type="number"
						placeholder="rate"
						min={0}
						max={10}
						value={RatingVariables.rate}
						onChange={this.props.change.bind(this)}
						name="rate"
					/>
				</div>
				<button className="btn btn-primary" onClick={this.props.rating.bind(this)}>
					submit
				</button>
				<label id="rateMessage">{this.props.rateMessage}</label>
			</form>
		);
	}
}

export default Rating;
