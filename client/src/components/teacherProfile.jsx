import React from 'react';
import Modal from 'react-awesome-modal';
import Rating from './Rating.jsx';
class TeacherProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Rate: false
		};
	}

	openModal(e) {
		this.setState({
			[e]: true
		});
	}

	closeModal(e) {
		this.setState({
			[e]: false
		});
	}
	componentWillMount() {
		this.props.showTeacherInfo();
	}
	render() {
		// const style = {
		//   display: 'flex',
		//   flexDirection: 'column',
		//   alignItems: 'center',
		//   justifyContent: 'center'
		// };
		// const schedules = this.props.teacherInfo.schedules;
		var that = this;
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="teacherInfo col-sm-4">
						<legend>Teacher Info</legend>
						<img
							src={this.props.teacherInfo.imgUrl || 'https://via.placeholder.com/100x100'}
							alt="uploaded images"
							height="100"
							width="100"
						/>
						<br />
						<label htmlFor="">Name: </label> {this.props.teacherInfo.userName}
						<br />
						<label htmlFor="">email: </label> {this.props.teacherInfo.email}
						<br />
						<label htmlFor="">Phone: </label> {this.props.teacherInfo.phone}
						<br />
						<label htmlFor="">Location: </label> {this.props.teacherInfo.location}
						<br />
						{this.props.teacherInfo.ratings.map((rates, index) => {
							return (
								<div key={index}>
									<label htmlFor="">Compliment: </label> {rates.text} <br />
									<label htmlFor="">Rating level: </label> {rates.rate} <br />
								</div>
							);
						})}
						<label htmlFor="">Summary: </label> <p>{this.props.teacherInfo.summary}</p>
					</div>
				</div>
				<div className="row">
					<div className="teacherCV col-sm-4">
						<legend>Teacher CV</legend>
						<iframe src={this.props.teacherInfo.cvFileUrl}>
							<p>{"javascript:alert('No file exist');"}</p>
						</iframe>
					</div>
				</div>

				<div className="row">
					<div className="teacherSchedule col-sm-4">
						<legend>Teacher Schedule</legend>
						<ul>
							<p>Please select your class time:</p>
							{this.props.teacherInfo.schedules.map((time, index) => {
								return (
									<li key={index}>
										{' '}
										<input
											type="radio"
											name="day"
											value={`${time.day} ${time.startHour} ${time.endHour}`}
											onClick={this.props.radioChange.bind(this)}
											id={`radio${index}`}
										/>{' '}
										{time.day}
										{' start at:'} {time.startHour} {' end at:'} {time.endHour}
									</li>
								);
							})}
						</ul>
						<button onClick={this.props.pick.bind(this)}>Pick</button>
						<label id="pickLabel">your request was send ...wait for confirm </label>
						<br />
						<input type="button" value="Rate" className="sign" onClick={() => this.openModal('Rate')} />
						<Modal
							visible={this.state.Rate}
							width="400"
							height="300"
							effect="fadeInDown"
							onClickAway={() => this.closeModal('Rate')}
						>
							<div>
								<Rating
									rateMessage={this.props.rateMessage}
									RatingVariables={this.props.RatingVariables}
									change={this.props.change.bind(this)}
									rating={this.props.rating.bind(this)}
								/>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

export default TeacherProfile;
